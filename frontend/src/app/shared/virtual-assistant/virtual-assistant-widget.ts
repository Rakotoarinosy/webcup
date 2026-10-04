import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, inject, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { environment } from '@/environments/environment';
import { AuthService } from '@/app/auth/auth.service';

type ResponseFormat = 'auto' | 'concise' | 'steps' | 'checklist';
type ReplyFormat = Exclude<ResponseFormat, 'auto'>;

interface AssistantReply {
    format: ReplyFormat;
    title: string;
    message: string;
    steps: string[];
    notes: string[];
    follow_up: string;
    recommended_services: RecommendedService[];
    navigation: { label: string; path: string } | null;
}

interface RecommendedService {
    id: string;
    name: string;
    category: string;
    description: string;
    contact_details: string;
    opening_hours: string;
    address: string | null;
}

type ChatMessage =
    | { role: 'user'; content: string }
    | { role: 'assistant'; content: AssistantReply };

interface ChatResponse {
    response: AssistantReply;
}

@Component({
    selector: 'app-virtual-assistant-widget',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './virtual-assistant-widget.html',
    styleUrl: './virtual-assistant-widget.scss'
})
export class VirtualAssistantWidget implements OnInit {
    private readonly http = inject(HttpClient);
    private readonly host = inject(ElementRef<HTMLElement>);
    private readonly auth = inject(AuthService);
    private readonly router = inject(Router);
    private readonly messagesElement = viewChild<ElementRef<HTMLElement>>('messageLog');

    readonly isOpen = signal(false);
    readonly messages = signal<ChatMessage[]>([]);
    readonly isSending = signal(false);
    readonly errorMessage = signal('');
    responsePreference: ResponseFormat = 'auto';
    draft = '';

    ngOnInit(): void {
        this.restoreConversation();
    }

    toggle(): void {
        this.isOpen.update((open) => !open);
        if (this.isOpen()) this.scrollToBottom();
    }

    startSuggestedMessage(message: string): void {
        this.draft = message;
        this.sendMessage();
    }

    sendMessage(): void {
        const message = this.draft.trim();
        if (!message || this.isSending() || message.length > 1200) return;

        const history = this.messages().slice(-8).map(({ role, content }) => ({
            role,
            content: role === 'assistant' ? this.toHistoryText(content) : content
        }));
        this.messages.update((messages) => [...messages, { role: 'user', content: message }]);
        this.draft = '';
        this.errorMessage.set('');
        this.isSending.set(true);
        this.scrollToBottom();

        this.http
            .post<ChatResponse>(`${environment.apiUrl}/assistant/chat`, {
                message,
                history,
                response_preference: this.responsePreference
            })
            .subscribe({
                next: ({ response }) => {
                    this.messages.update((messages) => [...messages, { role: 'assistant', content: response }]);
                    this.persistGuestConversation();
                    this.isSending.set(false);
                    this.scrollToBottom();
                },
                error: (error: HttpErrorResponse) => {
                    this.errorMessage.set(
                        error.status === 503
                            ? "L'assistante est momentanément indisponible. Réessayez plus tard."
                            : "Impossible d'obtenir une réponse. Vérifiez votre connexion et réessayez."
                    );
                    this.isSending.set(false);
                    this.scrollToBottom();
                }
            });
    }

    clearConversation(): void {
        this.messages.set([]);
        this.errorMessage.set('');
        if (this.auth.isAuthenticated()) {
            this.http.delete(`${environment.apiUrl}/assistant/history`).subscribe({ error: () => undefined });
        } else {
            localStorage.removeItem('terra-nova-assistant-history');
        }
    }

    navigate(path: string): void {
        this.router.navigateByUrl(path);
        this.isOpen.set(false);
    }

    formatLabel(format: ReplyFormat): string {
        return { concise: 'Réponse concise', steps: 'Étapes', checklist: 'Checklist' }[format];
    }

    private toHistoryText(reply: AssistantReply): string {
        return [
            `[${reply.format}] ${reply.title}`,
            reply.message,
            ...reply.steps,
            ...reply.notes,
            ...reply.recommended_services.map((service) => service.name),
            reply.follow_up
        ]
            .filter(Boolean)
            .join('\n')
            .slice(0, 1200);
    }

    onEnter(event: Event): void {
        if (!(event instanceof KeyboardEvent)) return;
        if (!event.shiftKey && !event.isComposing) {
            event.preventDefault();
            this.sendMessage();
        }
    }

    @HostListener('document:keydown.escape')
    closeOnEscape(): void {
        this.isOpen.set(false);
    }

    @HostListener('document:click', ['$event'])
    closeOnOutsideClick(event: MouseEvent): void {
        if (this.isOpen() && event.target instanceof Node && !this.host.nativeElement.contains(event.target)) {
            this.isOpen.set(false);
        }
    }

    private scrollToBottom(): void {
        requestAnimationFrame(() => {
            const element = this.messagesElement()?.nativeElement;
            if (element) element.scrollTop = element.scrollHeight;
        });
    }

    private restoreConversation(): void {
        if (this.auth.isAuthenticated()) {
            this.http.get<ChatMessage[]>(`${environment.apiUrl}/assistant/history`).subscribe({
                next: (messages) => this.messages.set(messages),
                error: () => this.messages.set([])
            });
            return;
        }
        try {
            const saved = localStorage.getItem('terra-nova-assistant-history');
            if (saved) this.messages.set(JSON.parse(saved) as ChatMessage[]);
        } catch {
            localStorage.removeItem('terra-nova-assistant-history');
        }
    }

    private persistGuestConversation(): void {
        if (!this.auth.isAuthenticated()) {
            localStorage.setItem('terra-nova-assistant-history', JSON.stringify(this.messages().slice(-40)));
        }
    }
}

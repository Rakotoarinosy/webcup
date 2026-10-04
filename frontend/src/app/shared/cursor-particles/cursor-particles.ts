import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, PLATFORM_ID, inject, signal } from '@angular/core';

interface CursorParticle {
    id: number;
    x: number;
    y: number;
    driftX: number;
    delay: number;
}

/** Décoration globale, légère et non interactive, adaptée à la couleur primaire active. */
@Component({
    selector: 'app-cursor-particles',
    standalone: true,
    template: `<div class="particles" aria-hidden="true">@for (particle of particles(); track particle.id) {<span class="particle" [style.left.px]="particle.x" [style.top.px]="particle.y" [style.--particle-x.px]="particle.driftX" [style.animation-delay.ms]="particle.delay"></span>}</div>`,
    styleUrl: './cursor-particles.scss'
})
export class CursorParticles {
    private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
    readonly particles = signal<CursorParticle[]>([]);
    private frame: number | null = null;
    private lastParticleAt = 0;
    private lastPointer = { x: 0, y: 0 };
    private id = 0;

    @HostListener('document:mousemove', ['$event'])
    onPointerMove(event: MouseEvent): void {
        if (!this.isBrowser || window.matchMedia('(prefers-reduced-motion: reduce), (pointer: coarse)').matches) return;
        this.lastPointer = { x: event.clientX, y: event.clientY };
        if (this.frame !== null) return;
        this.frame = requestAnimationFrame(() => {
            const now = performance.now();
            if (now - this.lastParticleAt >= 65) this.addParticles();
            this.frame = null;
        });
    }

    private addParticles(): void {
        this.lastParticleAt = performance.now();
        const { x, y } = this.lastPointer;
        const created: CursorParticle[] = [-1, 1].map((direction, index) => ({
            id: ++this.id, x: x + direction * 7, y: y + direction * 4,
            driftX: direction * 14, delay: index * 55
        }));
        this.particles.update((current) => [...current, ...created].slice(-16));
        window.setTimeout(() => this.particles.update((current) => current.filter((item) => !created.some((particle) => particle.id === item.id))), 900);
    }
}

"""Ports d'envoi des messages de rendez-vous. L'infrastructure les implémente (SMTP, httpSMS)."""

from abc import ABC, abstractmethod


class AppointmentMessenger(ABC):
    @abstractmethod
    def send_email(self, to: str, name: str, subject: str, text: str) -> None:
        """Envoie un email. Lève une exception en cas d'échec (le message sera retenté)."""

    @abstractmethod
    def send_sms(self, to: str, text: str) -> None:
        """Envoie un SMS au numéro E.164 `to`. Lève une exception en cas d'échec."""

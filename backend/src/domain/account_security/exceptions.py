"""Exceptions métier de la sécurité du compte (suffixe → code HTTP, voir shared/errors)."""

from src.domain.errors import DomainError


class DeviceNotFoundError(DomainError):
    def __init__(self, device_id: str) -> None:
        super().__init__(f"Device '{device_id}' not found")


class CurrentDeviceRevocationError(DomainError):  # → 400
    def __init__(self) -> None:
        super().__init__(
            "Cet appareil est celui que vous utilisez : utilisez « Se déconnecter » pour le quitter."
        )

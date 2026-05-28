from __future__ import annotations

import json
from pathlib import Path


class BudgetStore:
    def __init__(self, path: Path):
        self.path = path
        self.path.parent.mkdir(parents=True, exist_ok=True)
        if not self.path.exists():
            self._write({"totalLimit": 500, "spent": 0, "reservations": []})

    def _read(self) -> dict:
        with self.path.open("r", encoding="utf-8") as handle:
            return json.load(handle)

    def _write(self, payload: dict) -> None:
        with self.path.open("w", encoding="utf-8") as handle:
            json.dump(payload, handle, indent=2)

    def get_budget(self) -> dict:
        payload = self._read()
        spent = payload.get("spent", 0)
        limit_value = payload.get("totalLimit", 0)
        payload["remaining"] = round(limit_value - spent, 2)
        return payload

    def update_limit(self, total_limit: float) -> dict:
        payload = self._read()
        payload["totalLimit"] = round(total_limit, 2)
        self._write(payload)
        return self.get_budget()

    def reserve_trip(self, reservation: dict) -> dict:
        payload = self._read()
        reservations = payload.setdefault("reservations", [])
        reservations.insert(0, reservation)
        payload["spent"] = round(sum(item.get("totalCost", 0) for item in reservations), 2)
        self._write(payload)
        return self.get_budget()

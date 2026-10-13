import type { DataSection } from "./data.js";

type Pair = { key: string; value: string };

export type DataEditor = {
    reset: () => void;
    toSection: (headingName: string) => DataSection | null;
};

const emptyPair = (): Pair => ({ key: "", value: "" });

export const createDataEditor = (host: HTMLElement): DataEditor => {
    let pairs: Pair[] = [emptyPair()];

    const makeButton = (label: string, onClick: () => void): HTMLButtonElement => {
        const button = document.createElement("button");
        button.type = "button"; // フォーム内で送信されないように
        button.textContent = label;
        button.addEventListener("click", onClick);
        return button;
    };

    const makeInput = (value: string, placeholder: string, field: "key" | "value", onInput: (v: string) => void): HTMLInputElement => {
        const input = document.createElement("input");
        input.type = "text";
        input.value = value;
        input.placeholder = placeholder;
        input.dataset.field = field;
        input.addEventListener("input", () => onInput(input.value));
        return input;
    };

    const focusField = (index: number, field: "key" | "value") => {
        host.querySelector<HTMLInputElement>(
            `.data-editor-row[data-index="${index}"] input[data-field="${field}"]`
        )?.focus();
    };

    // ---- 状態 → DOM ----
    const render = () => {
        host.replaceChildren();

        pairs.forEach((pair, index) => {
            const row = document.createElement("div");
            row.className = "data-editor-row";
            row.dataset.index = String(index);

            const keyInput = makeInput(pair.key, "項目名", "key", v => {
                const current = pairs[index];
                if (current) current.key = v;
            });
            const valueInput = makeInput(pair.value, "内容", "value", v => {
                const current = pairs[index];
                if (current) current.value = v;
            });
            const removeButton = makeButton("×", () => {
                pairs.splice(index, 1);
                if (pairs.length === 0) pairs.push(emptyPair());
                render();
            });

            row.append(keyInput, valueInput, removeButton);
            host.append(row);
        });

        host.append(makeButton("項目を追加", () => {
            pairs.push(emptyPair());
            render();
        }));
    };

    // Enterキー: 項目名 → 内容 → 次の項目名（最後なら項目を追加）
    host.addEventListener("keydown", event => {
        const target = event.target;
        if (event.key !== "Enter" || !(target instanceof HTMLInputElement)) return;
        event.preventDefault(); // ダイアログの送信を防ぐ

        const index = Number(target.closest<HTMLElement>(".data-editor-row")?.dataset.index);
        if (target.dataset.field === "key") {
            focusField(index, "value");
            return;
        }
        if (index === pairs.length - 1) pairs.push(emptyPair());
        render();
        focusField(index + 1, "key");
    });

    render();

    return {
        reset: () => {
            pairs = [emptyPair()];
            render();
        },
        toSection: (headingName: string): DataSection | null => {
            const filled = pairs.filter(p => p.key.trim() !== "" || p.value.trim() !== "");
            if (filled.length === 0) return null;
            return {
                type: "data",
                headingName,
                items: filled.map(p => ({ key: p.key, value: p.value })),
            };
        },
    };
};
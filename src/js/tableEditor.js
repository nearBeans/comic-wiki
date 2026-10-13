const initialDraft = () => ({
    headers: ["項目1", "項目2"],
    rows: [["", ""]],
});
export const createTableEditor = (host) => {
    let draft = initialDraft();
    // ---- 状態を変える操作（変更後に必ず render する）----
    const addColumn = () => {
        draft.headers.push(`項目${draft.headers.length + 1}`);
        draft.rows.forEach(row => row.push(""));
        render();
    };
    const removeColumn = (col) => {
        if (draft.headers.length <= 1)
            return;
        draft.headers.splice(col, 1);
        draft.rows.forEach(row => row.splice(col, 1));
        render();
    };
    const addRow = () => {
        draft.rows.push(new Array(draft.headers.length).fill(""));
        render();
    };
    const removeRow = (row) => {
        draft.rows.splice(row, 1);
        render();
    };
    // ---- 小さな部品を作る ----
    const makeButton = (label, onClick, disabled = false) => {
        const button = document.createElement("button");
        button.type = "button"; // フォーム内で送信されないように
        button.textContent = label;
        button.disabled = disabled;
        button.addEventListener("click", onClick);
        return button;
    };
    const makeCellInput = (value, row, col, onInput) => {
        const input = document.createElement("input");
        input.type = "text";
        input.value = value;
        input.dataset.row = String(row); // 見出しは -1
        input.dataset.col = String(col);
        input.addEventListener("input", () => onInput(input.value));
        return input;
    };
    const focusCell = (row, col) => {
        host.querySelector(`input[data-row="${row}"][data-col="${col}"]`)?.focus();
    };
    // ---- 状態 → DOM ----
    const render = () => {
        host.replaceChildren();
        const table = document.createElement("table");
        // 見出し行
        const thead = document.createElement("thead");
        const headRow = document.createElement("tr");
        draft.headers.forEach((header, col) => {
            const th = document.createElement("th");
            const input = makeCellInput(header, -1, col, value => {
                draft.headers[col] = value; // DOM → 状態
            });
            th.append(input, makeButton("×", () => removeColumn(col), draft.headers.length <= 1));
            headRow.append(th);
        });
        thead.append(headRow);
        // 本体
        const tbody = document.createElement("tbody");
        draft.rows.forEach((row, r) => {
            const tr = document.createElement("tr");
            row.forEach((cell, c) => {
                const td = document.createElement("td");
                td.append(makeCellInput(cell, r, c, value => {
                    if (draft.rows[r])
                        draft.rows[r][c] = value; // DOM → 状態
                }));
                tr.append(td);
            });
            const removeTd = document.createElement("td");
            removeTd.append(makeButton("×", () => removeRow(r)));
            tr.append(removeTd);
            tbody.append(tr);
        });
        table.append(thead, tbody);
        const actions = document.createElement("div");
        actions.className = "table-editor-actions";
        actions.append(makeButton("列を追加", addColumn), makeButton("行を追加", addRow));
        host.append(table, actions);
    };
    // Enterキーでセルを下へ移動（最後の行なら行を追加）
    host.addEventListener("keydown", event => {
        const target = event.target;
        if (event.key !== "Enter" || !(target instanceof HTMLInputElement))
            return;
        event.preventDefault(); // ダイアログの送信を防ぐ
        const row = Number(target.dataset.row);
        const col = Number(target.dataset.col);
        if (row === draft.rows.length - 1)
            addRow(); // addRow内でrenderされるので、この後の移動先は存在する
        focusCell(row + 1, col);
    });
    render();
    return {
        reset: () => {
            draft = initialDraft();
            render();
        },
        toSection: (headingName) => ({
            type: "table",
            headingName,
            headers: [...draft.headers],
            rows: draft.rows.map(row => [...row]),
        }),
    };
};
//# sourceMappingURL=tableEditor.js.map
/* Mieterportal – JavaScript für den aktuellen HTML-Prototyp. */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
    initApplicationWizard();
    initApplicationFilters();
    initInformationSearch();
    initFileInputs();
    initCommunicationWorkspace();
});

function initApplicationWizard() {
    const previousButton = document.getElementById("prevStepBtn");
    const nextButton = document.getElementById("nextStepBtn");
    const formSteps = Array.from(document.querySelectorAll(".form-step"));
    const progressSteps = Array.from(document.querySelectorAll(".progress-step"));

    if (!previousButton || !nextButton || formSteps.length === 0) {
        return;
    }

    let currentStep = Math.max(
        1,
        formSteps.findIndex((step) => step.classList.contains("active")) + 1
    );
    const totalSteps = formSteps.length;

    function showStep(stepNumber) {
        formSteps.forEach((step, index) => {
            step.classList.toggle("active", index + 1 === stepNumber);
        });

        progressSteps.forEach((step) => {
            const value = Number(step.dataset.step);
            step.classList.toggle("active", value === stepNumber);
            step.classList.toggle("done", value < stepNumber);
        });

        previousButton.hidden = stepNumber === 1;
        nextButton.textContent =
            stepNumber === totalSteps ? "Antrag absenden" : "Weiter";
    }

    previousButton.addEventListener("click", () => {
        if (currentStep > 1) {
            currentStep -= 1;
            showStep(currentStep);
        }
    });

    nextButton.addEventListener("click", () => {
        if (currentStep < totalSteps) {
            currentStep += 1;
            showStep(currentStep);
            return;
        }

        alert("Antrag wurde abgesendet.");
    });

    showStep(currentStep);
}

function initApplicationFilters() {
    const searchInput = document.getElementById("applicationSearch");
    const statusTabs = Array.from(document.querySelectorAll(".status-tab"));
    const applicationCards = Array.from(
        document.querySelectorAll(".application-card")
    );

    if (!searchInput || statusTabs.length === 0 || applicationCards.length === 0) {
        return;
    }

    const requestedStatus = new URLSearchParams(window.location.search).get("status");
    const requestedTab = statusTabs.find(
        (tab) => tab.dataset.filter === requestedStatus
    );

    if (requestedTab) {
        statusTabs.forEach((tab) => tab.classList.remove("active"));
        requestedTab.classList.add("active");
    }

    let activeFilter =
        statusTabs.find((tab) => tab.classList.contains("active"))?.dataset.filter ||
        "alle";

    function matchesApplicationStatus(cardStatus) {
        if (activeFilter === "alle") {
            return true;
        }

        if (activeFilter === "offen") {
            return cardStatus !== "abgeschlossen";
        }

        return cardStatus === activeFilter;
    }

    function filterApplications() {
        const searchText = searchInput.value.trim().toLowerCase();

        applicationCards.forEach((card) => {
            const matchesSearch = card.textContent.toLowerCase().includes(searchText);
            const matchesStatus = matchesApplicationStatus(card.dataset.status || "");
            card.hidden = !(matchesSearch && matchesStatus);
        });
    }

    statusTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            statusTabs.forEach((item) => item.classList.remove("active"));
            tab.classList.add("active");
            activeFilter = tab.dataset.filter || "alle";
            filterApplications();
        });
    });

    searchInput.addEventListener("input", filterApplications);
    filterApplications();
}

function initInformationSearch() {
    const searchInput = document.getElementById("informationSearch");
    const cards = Array.from(document.querySelectorAll(".information-style-card, .information-card"));
    const sections = Array.from(
        document.querySelectorAll(".information-category-section, .information-category-block")
    );

    if (!searchInput || cards.length === 0) {
        return;
    }

    function filterInformation() {
        const searchText = searchInput.value.trim().toLowerCase();

        cards.forEach((card) => {
            card.hidden = !card.textContent.toLowerCase().includes(searchText);
        });

        sections.forEach((section) => {
            const visibleCards = section.querySelectorAll(
                ".information-style-card:not([hidden]), .information-card:not([hidden])"
            );
            section.hidden = visibleCards.length === 0;
        });
    }

    searchInput.addEventListener("input", filterInformation);
    filterInformation();
}

function initFileInputs() {
    document.querySelectorAll('input[type="file"]').forEach((fileInput) => {
        if (fileInput.id === "chatAttachment") {
            return;
        }

        fileInput.addEventListener("change", () => {
            const uploadLabel = fileInput.closest("label");
            const selectedFile = fileInput.files?.[0];

            if (!uploadLabel) {
                return;
            }

            if (selectedFile) {
                uploadLabel.title = `Ausgewählte Datei: ${selectedFile.name}`;
            } else {
                uploadLabel.removeAttribute("title");
            }
        });
    });
}

function initCommunicationWorkspace() {
    const chatList = document.getElementById("chatList");
    const messageList = document.getElementById("chatMessages");
    const answerField = document.getElementById("communicationAnswer");
    const sendButton = document.getElementById("sendAnswerBtn");

    if (!chatList || !messageList || !answerField || !sendButton) {
        return;
    }

    const searchInput = document.getElementById("chatSearch");
    const systemFolderButtons = Array.from(
        document.querySelectorAll("[data-chat-filter]")
    );
    const customFolderList = document.getElementById("customFolderList");
    const createFolderForm = document.getElementById("createFolderForm");
    const showFolderFormButton = document.getElementById("showFolderFormBtn");
    const cancelFolderButton = document.getElementById("cancelFolderBtn");
    const folderNameInput = document.getElementById("folderName");
    const folderRuleInput = document.getElementById("folderRule");
    const categorySelect = document.getElementById("chatCategorySelect");
    const attachmentInput = document.getElementById("chatAttachment");
    const selectedFileName = document.getElementById("selectedFileName");

    const chatTitle = document.getElementById("activeChatTitle");
    const chatNumber = document.getElementById("activeChatNumber");
    const chatSubtitle = document.getElementById("activeChatSubtitle");
    const chatStatus = document.getElementById("activeChatStatus");

    const chats = [
        {
            id: "rb-2026-001",
            number: "RB-2026-001",
            title: "Raumbedarf und bauliche Bedürfnisse",
            subtitle: "Unterbringung · Bundeshaus West",
            status: "rueckfragen",
            statusLabel: "Rückfrage offen",
            statusClass: "red",
            unread: 2,
            time: "Heute, 14:18",
            preview: "Bitte ergänzen Sie die Objekt-ID und einen aktuellen Raumplan.",
            messages: [
                {
                    date: "01.07.2026",
                    role: "user",
                    author: "Sie",
                    time: "10:24",
                    text: "Antrag eingereicht."
                },
                {
                    date: "08.07.2026",
                    role: "bbl",
                    author: "Fachstelle Unterbringung BBL",
                    time: "14:18",
                    important: true,
                    text: "Bitte ergänzen Sie die Objekt-ID und laden Sie, falls vorhanden, einen aktuellen Raumplan hoch."
                }
            ]
        },
        {
            id: "rb-2026-002",
            number: "RB-2026-002",
            title: "Standort- und Flächenanpassung",
            subtitle: "Unterbringung · Verwaltungszentrum Zollikofen",
            status: "pruefung",
            statusLabel: "In Prüfung",
            statusClass: "",
            unread: 0,
            time: "08.07.",
            preview: "Der Antrag wurde an die zuständige Fachstelle weitergeleitet.",
            messages: [
                {
                    date: "03.07.2026",
                    role: "user",
                    author: "Sie",
                    time: "09:42",
                    text: "Antrag eingereicht."
                },
                {
                    date: "08.07.2026",
                    role: "bbl",
                    author: "BBL",
                    time: "11:05",
                    text: "Der Antrag wurde an die zuständige Fachstelle weitergeleitet und befindet sich in Prüfung."
                }
            ]
        },
        {
            id: "ob-2026-007",
            number: "OB-2026-007",
            title: "Innenbegrünung – Ersatzpflanzen",
            subtitle: "Objektbetrieb · Guisanplatz 1",
            status: "offen",
            statusLabel: "Offen",
            statusClass: "",
            unread: 1,
            time: "07.07.",
            preview: "Vielen Dank. Wir prüfen die Verfügbarkeit der gewünschten Pflanzen.",
            messages: [
                {
                    date: "07.07.2026",
                    role: "user",
                    author: "Sie",
                    time: "08:15",
                    text: "Für den Empfangsbereich werden zwei Ersatzpflanzen benötigt."
                },
                {
                    date: "07.07.2026",
                    role: "bbl",
                    author: "Objektbetrieb BBL",
                    time: "13:10",
                    text: "Vielen Dank. Wir prüfen die Verfügbarkeit der gewünschten Pflanzen."
                }
            ]
        },
        {
            id: "rb-2025-018",
            number: "RB-2025-018",
            title: "Anpassung Sitzungszimmer",
            subtitle: "Unterbringung · Bundesgasse 32",
            status: "abgeschlossen",
            statusLabel: "Abgeschlossen",
            statusClass: "green",
            unread: 0,
            time: "12.12.2025",
            preview: "Der Antrag wurde abgeschlossen. Vielen Dank für die Zusammenarbeit.",
            messages: [
                {
                    date: "02.12.2025",
                    role: "user",
                    author: "Sie",
                    time: "15:20",
                    text: "Vielen Dank für die Umsetzung."
                },
                {
                    date: "12.12.2025",
                    role: "bbl",
                    author: "Fachstelle Unterbringung BBL",
                    time: "10:00",
                    text: "Der Antrag wurde abgeschlossen. Vielen Dank für die Zusammenarbeit."
                }
            ]
        }
    ];

    const storageKey = "mieterportal-chat-folders-v1";
    let customFolders = loadCustomFolders();
    let activeFolder = getRequestedFolder();
    let activeChatId = chats[0].id;
    let searchText = "";

    function loadCustomFolders() {
        try {
            const stored = JSON.parse(localStorage.getItem(storageKey));
            if (Array.isArray(stored)) {
                return stored;
            }
        } catch (error) {
            // Bei ungültigen lokalen Daten wird die Standardkategorie verwendet.
        }

        return [
            {
                id: "wichtig",
                name: "Wichtig",
                rule: "manual",
                chatIds: ["rb-2026-001"]
            }
        ];
    }

    function saveCustomFolders() {
        try {
            localStorage.setItem(storageKey, JSON.stringify(customFolders));
        } catch (error) {
            // Der Prototyp funktioniert auch, wenn der Browser lokale Speicherung blockiert.
        }
    }

    function getRequestedFolder() {
        const requested = new URLSearchParams(window.location.search).get("folder");
        const systemFolders = [
            "alle",
            "rueckfragen",
            "pruefung",
            "offen",
            "abgeschlossen"
        ];
        return systemFolders.includes(requested) ? `system:${requested}` : "system:alle";
    }

    function folderMatchesChat(filter, chat) {
        if (filter === "alle") {
            return true;
        }

        if (filter === "offen") {
            return chat.status !== "abgeschlossen";
        }

        return chat.status === filter;
    }

    function getCustomFolder(folderId) {
        return customFolders.find((folder) => folder.id === folderId);
    }

    function chatMatchesActiveFolder(chat) {
        const [type, value] = activeFolder.split(":");

        if (type === "system") {
            return folderMatchesChat(value, chat);
        }

        const folder = getCustomFolder(value);
        if (!folder) {
            return true;
        }

        if (folder.rule === "manual") {
            return folder.chatIds.includes(chat.id);
        }

        return folderMatchesChat(folder.rule, chat);
    }

    function getVisibleChats() {
        return chats.filter((chat) => {
            const matchesFolder = chatMatchesActiveFolder(chat);
            const haystack = `${chat.number} ${chat.title} ${chat.subtitle} ${chat.preview}`.toLowerCase();
            const matchesSearch = haystack.includes(searchText);
            return matchesFolder && matchesSearch;
        });
    }

    function renderFolderCounts() {
        document.querySelectorAll("[data-folder-count]").forEach((counter) => {
            const filter = counter.dataset.folderCount;
            const count = chats.filter((chat) => folderMatchesChat(filter, chat)).length;
            counter.textContent = String(count);
        });
    }

    function renderCustomFolders() {
        customFolderList.replaceChildren();

        customFolders.forEach((folder) => {
            const row = document.createElement("div");
            row.className = "custom-folder-row";

            const button = document.createElement("button");
            button.type = "button";
            button.className = "custom-chat-folder";
            button.dataset.customFolder = folder.id;
            button.classList.toggle("active", activeFolder === `custom:${folder.id}`);

            const name = document.createElement("span");
            name.textContent = folder.name;

            const count = document.createElement("strong");
            count.textContent = String(
                chats.filter((chat) => {
                    if (folder.rule === "manual") {
                        return folder.chatIds.includes(chat.id);
                    }
                    return folderMatchesChat(folder.rule, chat);
                }).length
            );

            button.append(name, count);
            button.addEventListener("click", () => {
                activeFolder = `custom:${folder.id}`;
                renderAll();
            });

            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.className = "custom-folder-delete";
            deleteButton.textContent = "×";
            deleteButton.title = "Kategorie löschen";
            deleteButton.addEventListener("click", () => {
                customFolders = customFolders.filter((item) => item.id !== folder.id);
                if (activeFolder === `custom:${folder.id}`) {
                    activeFolder = "system:alle";
                }
                saveCustomFolders();
                renderAll();
            });

            row.append(button, deleteButton);
            customFolderList.append(row);
        });
    }

    function renderChatList() {
        chatList.replaceChildren();
        const visibleChats = getVisibleChats();

        if (visibleChats.length === 0) {
            const empty = document.createElement("p");
            empty.className = "chat-list-empty";
            empty.textContent = "In dieser Kategorie wurden keine Chats gefunden.";
            chatList.append(empty);
            return;
        }

        if (!visibleChats.some((chat) => chat.id === activeChatId)) {
            activeChatId = visibleChats[0].id;
        }

        visibleChats.forEach((chat) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "chat-list-item";
            button.dataset.unread = String(chat.unread > 0);
            button.classList.toggle("active", chat.id === activeChatId);

            const avatar = document.createElement("span");
            avatar.className = "chat-list-avatar";
            avatar.textContent = "BBL";

            const main = document.createElement("span");
            main.className = "chat-list-main";

            const titleRow = document.createElement("span");
            titleRow.className = "chat-list-title-row";

            const title = document.createElement("span");
            title.className = "chat-list-title";
            title.textContent = chat.title;

            const time = document.createElement("span");
            time.className = "chat-list-time";
            time.textContent = chat.time;

            const preview = document.createElement("span");
            preview.className = "chat-list-preview";
            preview.textContent = `${chat.number} · ${chat.preview}`;

            titleRow.append(title, time);
            main.append(titleRow, preview);
            button.append(avatar, main);

            if (chat.unread > 0) {
                const badge = document.createElement("span");
                badge.className = "chat-list-badge";
                badge.textContent = String(chat.unread);
                button.append(badge);
            }

            button.addEventListener("click", () => {
                activeChatId = chat.id;
                chat.unread = 0;
                renderAll();
            });

            chatList.append(button);
        });
    }

    function renderMessages(chat) {
        messageList.replaceChildren();
        let currentDate = "";

        chat.messages.forEach((message) => {
            if (message.date && message.date !== currentDate) {
                currentDate = message.date;
                const date = document.createElement("div");
                date.className = "chat-conversation-date";
                date.textContent = message.date;
                messageList.append(date);
            }

            const row = document.createElement("div");
            row.className = `chat-dialog-row ${message.role}`;
            if (message.important) {
                row.classList.add("important");
            }

            const avatar = document.createElement("span");
            avatar.className = "chat-dialog-avatar";
            avatar.textContent = message.role === "user" ? "Sie" : "BBL";

            const bubble = document.createElement("div");
            bubble.className = "chat-dialog-bubble";

            const meta = document.createElement("div");
            meta.className = "chat-dialog-meta";

            const author = document.createElement("strong");
            author.textContent = message.author;

            const time = document.createElement("span");
            time.textContent = message.time;

            const text = document.createElement("p");
            text.textContent = message.text;

            meta.append(author, time);
            bubble.append(meta, text);

            if (message.role === "user") {
                row.append(bubble, avatar);
            } else {
                row.append(avatar, bubble);
            }

            messageList.append(row);
        });

        messageList.scrollTop = messageList.scrollHeight;
    }

    function renderAssignmentSelect(chat) {
        categorySelect.replaceChildren();

        const noneOption = document.createElement("option");
        noneOption.value = "";
        noneOption.textContent = "Keine eigene Kategorie";
        categorySelect.append(noneOption);

        customFolders
            .filter((folder) => folder.rule === "manual")
            .forEach((folder) => {
                const option = document.createElement("option");
                option.value = folder.id;
                option.textContent = folder.name;
                option.selected = folder.chatIds.includes(chat.id);
                categorySelect.append(option);
            });

        categorySelect.disabled = customFolders.every(
            (folder) => folder.rule !== "manual"
        );
    }

    function renderActiveChat() {
        const chat = chats.find((item) => item.id === activeChatId) || chats[0];
        activeChatId = chat.id;

        chatTitle.textContent = chat.title;
        chatNumber.textContent = chat.number;
        chatSubtitle.textContent = chat.subtitle;
        chatStatus.textContent = chat.statusLabel;
        chatStatus.className = `tag ${chat.statusClass}`.trim();

        renderMessages(chat);
        renderAssignmentSelect(chat);
    }

    function updateActiveFolderButtons() {
        systemFolderButtons.forEach((button) => {
            button.classList.toggle(
                "active",
                activeFolder === `system:${button.dataset.chatFilter}`
            );
        });
    }

    function renderAll() {
        updateActiveFolderButtons();
        renderFolderCounts();
        renderCustomFolders();
        renderChatList();
        renderActiveChat();
    }

    function resizeAnswerField() {
        answerField.style.height = "auto";
        const nextHeight = Math.min(answerField.scrollHeight, 132);
        answerField.style.height = `${Math.max(nextHeight, 34)}px`;
    }

    function updateSendButton() {
        const disabled = answerField.value.trim() === "";
        sendButton.classList.toggle("is-disabled", disabled);
        sendButton.setAttribute("aria-disabled", String(disabled));
    }

    function sendMessage() {
        const text = answerField.value.trim();
        if (!text) {
            return;
        }

        const chat = chats.find((item) => item.id === activeChatId);
        if (!chat) {
            return;
        }

        chat.messages.push({
            date: new Intl.DateTimeFormat("de-CH").format(new Date()),
            role: "user",
            author: "Sie",
            time: "gerade eben",
            text
        });
        chat.preview = text;
        chat.time = "gerade eben";

        answerField.value = "";
        if (attachmentInput) {
            attachmentInput.value = "";
        }
        if (selectedFileName) {
            selectedFileName.hidden = true;
            selectedFileName.textContent = "";
        }

        resizeAnswerField();
        updateSendButton();
        renderAll();
        answerField.focus();
    }

    systemFolderButtons.forEach((button) => {
        button.addEventListener("click", () => {
            activeFolder = `system:${button.dataset.chatFilter}`;
            renderAll();
        });
    });

    if (searchInput) {
        searchInput.addEventListener("input", () => {
            searchText = searchInput.value.trim().toLowerCase();
            renderChatList();
            renderActiveChat();
        });
    }

    if (showFolderFormButton && createFolderForm) {
        showFolderFormButton.addEventListener("click", () => {
            createFolderForm.hidden = false;
            folderNameInput?.focus();
        });
    }

    if (cancelFolderButton && createFolderForm) {
        cancelFolderButton.addEventListener("click", () => {
            createFolderForm.hidden = true;
            createFolderForm.reset();
        });
    }

    if (createFolderForm && folderNameInput && folderRuleInput) {
        createFolderForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const name = folderNameInput.value.trim();
            if (!name) {
                return;
            }

            const id = `${Date.now()}-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
            customFolders.push({
                id,
                name,
                rule: folderRuleInput.value,
                chatIds: []
            });
            saveCustomFolders();
            activeFolder = `custom:${id}`;
            createFolderForm.reset();
            createFolderForm.hidden = true;
            renderAll();
        });
    }

    if (categorySelect) {
        categorySelect.addEventListener("change", () => {
            const selectedFolderId = categorySelect.value;

            customFolders.forEach((folder) => {
                if (folder.rule === "manual") {
                    folder.chatIds = folder.chatIds.filter(
                        (chatId) => chatId !== activeChatId
                    );
                }
            });

            if (selectedFolderId) {
                const folder = getCustomFolder(selectedFolderId);
                if (folder && folder.rule === "manual") {
                    folder.chatIds.push(activeChatId);
                }
            }

            saveCustomFolders();
            renderAll();
        });
    }

    answerField.addEventListener("input", () => {
        resizeAnswerField();
        updateSendButton();
    });

    answerField.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    });

    sendButton.addEventListener("click", sendMessage);

    if (attachmentInput && selectedFileName) {
        attachmentInput.addEventListener("change", () => {
            const file = attachmentInput.files?.[0];
            selectedFileName.hidden = !file;
            selectedFileName.textContent = file ? `Anhang: ${file.name}` : "";
        });
    }

    resizeAnswerField();
    updateSendButton();
    renderAll();
}

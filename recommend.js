export function createRecommend() {
    const form = document.createElement('form');

    const budgetDiv = document.createElement('div');
    const budgetLabel = document.createElement('label');
    budgetLabel.setAttribute('for', 'budget');
    budgetLabel.textContent = '예산';
    const budgetInput = document.createElement('input');
    budgetInput.setAttribute('type', 'text');
    budgetInput.setAttribute('id', 'budget');
    budgetInput.setAttribute('placeholder', 'ex) 50만원, 100만원, 200만원');
    budgetInput.setAttribute('autocomplete', 'off');
    budgetDiv.appendChild(budgetLabel);
    budgetDiv.appendChild(budgetInput);
    form.appendChild(budgetDiv);

    const taskDiv = document.createElement('div');
    const taskLabel = document.createElement('label');
    taskLabel.setAttribute('for', 'task');
    taskLabel.textContent = '컴퓨터로 할 작업';
    const taskInput = document.createElement('input');
    taskInput.setAttribute('type', 'text');
    taskInput.setAttribute('id', 'task');
    taskInput.setAttribute('placeholder', 'ex) 고사양 게임, 그래픽 디자인, 코딩, 문서작업 등');
    taskInput.setAttribute('autocomplete', 'off');
    taskDiv.appendChild(taskLabel);
    taskDiv.appendChild(taskInput);
    form.appendChild(taskDiv);

    const monitorDiv = document.createElement('div');
    const monitorLabel = document.createElement('label');
    monitorLabel.setAttribute('for', 'monitor');
    monitorLabel.textContent = '같이 쓸 모니터 사양';
    const monitorInput = document.createElement('input');
    monitorInput.setAttribute('type', 'text');
    monitorInput.setAttribute('id', 'monitor');
    monitorInput.setAttribute('placeholder', 'ex) FHD 75hz, QHD 144hz, 4K 60hz 등');
    monitorInput.setAttribute('autocomplete', 'off');
    monitorDiv.appendChild(monitorLabel);
    monitorDiv.appendChild(monitorInput);
    form.appendChild(monitorDiv);

    const etcDiv = document.createElement('div');
    const etcLabel = document.createElement('label');
    etcLabel.setAttribute('for', 'etc');
    etcLabel.textContent = '추가 요구사항 또는 기타 요청';
    const etcTextarea = document.createElement('input');
    etcTextarea.setAttribute('type', 'text');
    etcTextarea.setAttribute('id', 'etc');
    etcTextarea.setAttribute('placeholder', 'ex) AMD CPU를 사용, 램은 16G, 내장 그래픽 사용 등');
    etcTextarea.setAttribute('autocomplete', 'off');
    etcDiv.appendChild(etcLabel);
    etcDiv.appendChild(etcTextarea);
    form.appendChild(etcDiv);

    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.className = "submitButton";
    submitButton.textContent = '컴퓨터 견적 추천';
    form.appendChild(submitButton);

    const showsaveButton = document.createElement('button');
    showsaveButton.setAttribute('type', 'button');
    showsaveButton.className = "showsaveButton";
    showsaveButton.textContent = '저장한 견적 보기';
    form.appendChild(showsaveButton);

    return form;
}

export function createPC(pc) {
    const $pc = document.createElement("div");

    const $cpu = document.createElement("a");
    const $mainboard = document.createElement("a");
    const $memory = document.createElement("a");
    const $GPU = document.createElement("a");
    const $storage = document.createElement("a");
    const $power = document.createElement("a");
    const $total = document.createElement("p");

    let searchURL = "https://search.danawa.com/dsearch.php?query=";

    $cpu.innerHTML = pc[0] + "<br>";
    $cpu.setAttribute('href', searchURL + pc[0].substring(pc[0].indexOf(":")+1));
    $cpu.setAttribute('target', '_blank');

    $mainboard.innerHTML = pc[1] + "<br>";
    $mainboard.setAttribute('href', searchURL + pc[1].substring(pc[1].indexOf(":")+1));
    $mainboard.setAttribute('target', '_blank');

    $memory.innerHTML = pc[2] + "<br>";
    $memory.setAttribute('href', searchURL + pc[2].substring(pc[2].indexOf(":")+1));
    $memory.setAttribute('target', '_blank');

    $GPU.innerHTML = pc[3] + "<br>";
    $GPU.setAttribute('href', searchURL + pc[3].substring(pc[3].indexOf(":")+1));
    $GPU.setAttribute('target', '_blank');

    $storage.innerHTML = pc[4] + "<br>";
    $storage.setAttribute('href', searchURL + pc[4].substring(pc[4].indexOf(":")+1));
    $storage.setAttribute('target', '_blank');

    $power.innerHTML = pc[5] + "<br>";
    $power.setAttribute('href', searchURL + pc[5].substring(pc[5].indexOf(":")+1));
    $power.setAttribute('target', '_blank');

    $total.innerHTML = pc[6] + "<br>";

    $pc.append($cpu, $mainboard, $memory, $GPU, $storage, $power, $total);

    return $pc;
}

export function splitArr(result, n) {
    let arr = result.split(n);
    let pc = [-1, -1, -1, -1, -1, -1, -1];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].includes('CPU:') || arr[i].includes('CPU :')) {
            pc[0] = arr[i];
        }
        else if (arr[i].includes('메인보드:') || arr[i].includes('메인보드 :')) {
            pc[1] = arr[i];
        }
        else if (arr[i].includes('메모리:') || arr[i].includes('메모리 :')) {
            pc[2] = arr[i];
        }
        else if (arr[i].includes('GPU:') || arr[i].includes('GPU :') || arr[i].includes('그래픽카드 :') || arr[i].includes('그래픽카드:') || arr[i].includes('그래픽 카드:') || arr[i].includes('그래픽 카드 :')) {
            pc[3] = arr[i];
        }
        else if (arr[i].includes('저장장치:') || arr[i].includes('저장장치 :')) {
            pc[4] = arr[i];
        }
        else if (arr[i].includes('파워:') || arr[i].includes('파워 :') || arr[i].includes('파워 서플라이:') || arr[i].includes('파워 서플라이 :')) {
            pc[5] = arr[i];
        }
        else if (arr[i].includes('총 견적')) {
            pc[6] = arr[i];
        }
    }
    for (let j = 0; j < 7; j++) {
        if (pc[j] === -1) {
            return -1;
        }
        else if (pc[j].includes('~')) {
            return -1;
        }
    }
    return pc;
}


export function saveLocal(pc) {
    localStorage.setItem("savepc", pc);
}

export function getLocal(pc) {
    return localStorage.getItem("savepc") ? localStorage.getItem("savepc") : -1;
}

export function deleteLocal() {
    localStorage.removeItem("savepc");
}
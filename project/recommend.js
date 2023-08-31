export function createRecommend() {
    const form = document.createElement('form');

    const budgetDiv = document.createElement('div');
    const budgetLabel = document.createElement('label');
    budgetLabel.setAttribute('for', 'budget');
    budgetLabel.textContent = '예산';
    const budgetInput = document.createElement('input');
    budgetInput.setAttribute('type', 'text');
    budgetInput.setAttribute('id', 'budget');
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
    monitorDiv.appendChild(monitorLabel);
    monitorDiv.appendChild(monitorInput);
    form.appendChild(monitorDiv);

    const etcDiv = document.createElement('div');
    const etcLabel = document.createElement('label');
    etcLabel.setAttribute('for', 'etc');
    etcLabel.textContent = '추가 요구사항 또는 기타 요청';
    const etcTextarea = document.createElement('textarea');
    etcTextarea.setAttribute('id', 'etc');
    etcDiv.appendChild(etcLabel);
    etcDiv.appendChild(etcTextarea);
    form.appendChild(etcDiv);

    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.textContent = '컴퓨터 견적 추천';
    form.appendChild(submitButton);

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
    $cpu.setAttribute('href', searchURL + pc[0]);
    $cpu.setAttribute('target', '_blank');

    $mainboard.innerHTML = pc[1] + "<br>";
    $mainboard.setAttribute('href', searchURL + pc[1]);
    $mainboard.setAttribute('target', '_blank');

    $memory.innerHTML = pc[2] + "<br>";
    $memory.setAttribute('href', searchURL + pc[2]);
    $memory.setAttribute('target', '_blank');

    $GPU.innerHTML = pc[3] + "<br>";
    $GPU.setAttribute('href', searchURL + pc[3]);
    $GPU.setAttribute('target', '_blank');
    
    $storage.innerHTML = pc[4] + "<br>";
    $storage.setAttribute('href', searchURL + pc[4]);
    $storage.setAttribute('target', '_blank');

    $power.innerHTML = pc[5] + "<br>";
    $power.setAttribute('href', searchURL + pc[5]);
    $power.setAttribute('target', '_blank');

    $total.innerHTML = pc[6] + "<br>";

    $pc.append($cpu, $mainboard, $memory, $GPU, $storage, $power, $total);

    return $pc;
}

export function splitArr(result) {
    let arr = result.split('\n');
    let pc = [-1, -1, -1, -1, -1, -1, -1];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].includes('CPU')) {
            pc[0] = arr[i];
        }
        else if (arr[i].includes('메인보드')) {
            pc[1] = arr[i];
        }
        else if (arr[i].includes('메모리')) {
            pc[2] = arr[i];
        }
        else if (arr[i].includes('GPU')) {
            pc[3] = arr[i];
        }
        else if (arr[i].includes('저장장치')) {
            pc[4] = arr[i];
        }
        else if (arr[i].includes('파워')) {
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
        else if(pc[j].includes('~')){
            return -1;
        }
    }
    return pc;
}
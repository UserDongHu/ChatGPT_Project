import { createRecommend, createPC, splitArr, saveLocal, getLocal, deleteLocal } from "./recommend.js";
import { createQuestion, createChat } from "./question.js";

const $home = document.querySelector('#home');
const $select = document.querySelector('.select');
const $show = document.querySelector('.show');
const $selected = document.querySelector('.selected');
const $recommend = document.querySelector('.recommend');
const $question = document.querySelector('.question');
const $resultContainer = document.querySelector('.resultContainer');



$home.addEventListener('click', e => {
    $select.style.display = '';
    $show.style.display = 'none';
    $selected.innerHTML = "";
    $resultContainer.innerHTML = "";
})

$recommend.addEventListener('click', e => {
    $select.style.display = 'none';
    $show.style.display = '';
    $selected.innerHTML = "";
    const recommendform = createRecommend();
    $selected.append(recommendform);

    const $budget = document.querySelector('#budget');
    const $task = document.querySelector('#task');
    const $monitor = document.querySelector('#monitor');
    const $etc = document.querySelector('#etc');
    const $showsaveButton = document.querySelector('.showsaveButton');
    const $submitButton = document.querySelector('.submitButton');

    const data = [];
    data.push(
        {
            "role": "system",
            "content": "assistant는 사용될 예산과 할 작업, 같이 쓸 모니터 사양과 추가 요구사항을 입력받아서 사용자가 정해준 포맷에 맞게 예산에 적절한 컴퓨터 견적을 출력해줍니다."
        },
        {
            "role": "user",
            "content": "CPU: ~ (약 ~만원), 메인보드: ~ (약 ~만원), 메모리: ~  (약 ~만원), GPU: ~ (약 ~만원), 저장장치: ~ (약 ~만원),  파워: ~ (약 ~만원), 총 견적: 약 ~만원 이런식으로 결과를 보여줘. 이외에 다른 문장은 제외해줘."
        },
        {
            "role": "user",
            "content": "그래픽카드가 없을때는 GPU : 내장그래픽 이라고 출력해줘"
        },
        {
            "role": "user",
            "content": "결과는 최대한 예산에 가깝게 견적을 짜고 줄바꿈을 해서 보여줘"
        }
    )

    $showsaveButton.addEventListener('click', e => {
        $resultContainer.innerHTML = "";
        if (getLocal() === -1) {
            $resultContainer.innerHTML = "<div>저장된 견적이 없습니다.</div>"
        } else {
            const pc = splitArr(getLocal(), ',');
            const mypc = createPC(pc);
            $resultContainer.appendChild(mypc);

            const $delete = document.createElement('button');
            $delete.innerText = '저장된 견적 삭제';
            $delete.addEventListener('click', function () {
                if (window.confirm("저장된 견적을 삭제하시겠습니까?")) {
                    deleteLocal();
                    $resultContainer.innerHTML = "";
                }
            });
            $resultContainer.append($delete);
        }

    })

    $submitButton.addEventListener('click', e => {
        if ($budget.value == "") {
            e.preventDefault();
            $budget.focus();
        } else if ($task.value == "") {
            e.preventDefault();
            $task.focus();
        } else if ($monitor.value == "") {
            e.preventDefault();
            $monitor.focus();
        } else {
            $resultContainer.innerHTML = "";
            const typing = document.createElement('div');
            typing.className = 'waiting';
            const typetext = document.createElement('p');
            typetext.innerText = "잠시만 기다려주세요..";
            typing.append(typetext);
            $resultContainer.append(typing);
            e.preventDefault();
            const contents = $budget.value + "의 예산과 " + $task.value + "등을 하면서 " + $monitor.value + "사양이 모니터를 쓸 때 " + $etc.value + " , 컴퓨터 견적 추천해줘."
            data.push({
                "role": "user",
                "content": contents
            })

            recommendchatGPTAPI()
        }

    })

    function recommendchatGPTAPI() {
        fetch(`https://estsoft-openai-api.jejucodingcamp.workers.dev/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            redirect: 'follow'
        })
            .then(res => res.json())
            .then(json => {
                let result = json.choices[0].message.content;
                const pc = splitArr(result, '\n');
                if (pc === -1) {
                    console.log(result);
                    $resultContainer.innerHTML = `<div>오류가 발생했습니다. 더 자세하게 적으시고 다시 시도해주세요.</div>`;
                } else {
                    const mypc = createPC(pc);
                    $resultContainer.innerHTML = "";
                    $resultContainer.appendChild(mypc);

                    const $save = document.createElement('button');
                    $save.innerText = '견적 저장';
                    $save.addEventListener('click', function () {
                        if (getLocal() === -1) {
                            saveLocal(pc);
                            window.alert("견적이 저장되었습니다.")
                        } else {
                            if (window.confirm("저장된 견적을 지우고 새로 저장하시겠습니까?")) {
                                saveLocal(pc);
                            }
                        }
                    });
                    $resultContainer.append($save);
                }
            })
    }

})

$question.addEventListener('click', e => {
    $select.style.display = 'none';
    $show.style.display = '';
    $selected.innerHTML = "";
    const questionform = createQuestion();
    $selected.append(questionform);

    const $inputQuestion = document.querySelector('#inputquestion');
    const $button = document.querySelector('button');

    const data2 = [];
    data2.push(
        {
            "role": "system",
            "content": "assistant는 컴퓨터에 대해 잘 알고있는 전문가이며, 컴퓨터 하드웨어 및 소프트웨어에 대한 정보와 컴퓨터에 문제가 있을 때 해결법을 알려줍니다."
        }
    )

    $button.addEventListener('click', async function (e) {
        e.preventDefault();
        const contents = $inputQuestion.value;
        $inputQuestion.value = "";
        if (contents == "") {
            $inputQuestion.focus();
        } else {
            const newchat = createChat(contents, true);
            if ($resultContainer.firstChild) {
                const firstChild = $resultContainer.firstChild;
                $resultContainer.insertBefore(newchat, firstChild);
            } else {
                $resultContainer.appendChild(newchat);
            }
            data2.push({
                "role": "user",
                "content": contents
            })
            const typing = document.createElement('div');
            typing.className = 'typing';
            const typetext = document.createElement('p');
            typetext.innerText = "잠시만 기다려주세요..";
            typing.append(typetext);
            const firstChild2 = $resultContainer.firstChild;
            $resultContainer.insertBefore(typing, firstChild2);

            await questionchatGPTAPI();
            $resultContainer.removeChild(typing);
            const reply = createChat(data2[data2.length - 1].content, false);
            const firstChild3 = $resultContainer.firstChild;
            $resultContainer.insertBefore(reply, firstChild3);
        }
    })

    async function questionchatGPTAPI() {
        await fetch(`https://estsoft-openai-api.jejucodingcamp.workers.dev/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data2),
            redirect: 'follow'
        })
            .then(res => res.json())
            .then(json => {
                let result = json.choices[0].message.content;
                data2.push({
                    "role": "assistant",
                    "content": result
                })
            })
    }

})
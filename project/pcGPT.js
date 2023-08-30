import { createRecommend, createPC, splitArr } from "./recommend.js";
import { createQuestion, createChat } from "./question.js";

const $home = document.querySelector('#home');
const $select = document.querySelector('.select');
const $selected = document.querySelector('.selected');
const $recommend = document.querySelector('.recommend');
const $question = document.querySelector('.question');
const $resultContainer = document.querySelector('.resultContainer');

$home.addEventListener('click', e => {
    $select.style.display = '';
    $selected.innerHTML = "";
    $resultContainer.innerHTML = "";
})

$recommend.addEventListener('click', e => {
    $select.style.display = 'none';
    $selected.innerHTML = "";
    const recommendform = createRecommend();
    $selected.append(recommendform);

    const $budget = document.querySelector('#budget');
    const $task = document.querySelector('#task');
    const $monitor = document.querySelector('#monitor');
    const $etc = document.querySelector('#etc');
    const $button = document.querySelector('button');

    const data = [];
    data.push(
        {
            "role": "system",
            "content": "assistant는 예산과 할 작업, 같이 쓸 모니터 사양을 토대로 컴퓨터 견적을 추천해줍니다."
        },
        {
            "role": "user",
            "content": "CPU : ~ (약 ~만원), 메인보드 : ~ (약 ~만원), 메모리 : ~  (약 ~만원), GPU : ~ (약 ~만원), 저장장치 : ~ (약 ~만원),  파워 : ~ (약 ~만원), 총 견적 : 약 ~만원 이런식으로 결과를 보여줘"
        },
        {
            "role": "user",
            "content": "결과는 문장을 제외하고 줄바꿈을 사용해서 보여줘."
        }
    )

    $button.addEventListener('click', e => {
        $resultContainer.innerHTML = "";
        e.preventDefault();
        const contents = $budget.value + ", " + $task.value + ", " + $monitor.value + ", " + $etc.value
        data.push({
            "role": "user",
            "content": contents
        })
        
        recommendchatGPTAPI()
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
                const pc = splitArr(result);
                if (pc === -1) {
                    console.log(pc);
                    $resultContainer.innerText = `오류가 발생했습니다. 다시 한번 시도해주세요.`
                } else {
                    const mypc = createPC(pc);
                    $resultContainer.appendChild(mypc);
                }
            })
    }

})

$question.addEventListener('click', e => {
    $select.style.display = 'none';
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
        const newchat = createChat(contents, true);
        $resultContainer.appendChild(newchat);
        data2.push({
            "role": "user",
            "content": contents
        })
        await questionchatGPTAPI();
        const reply = createChat(data2[data2.length - 1].content, false);
        $resultContainer.append(reply);
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
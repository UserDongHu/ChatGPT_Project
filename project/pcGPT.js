const $budget = document.querySelector('#budget');
const $task = document.querySelector('#task');
const $monitor = document.querySelector('#monitor');
const $etc = document.querySelector('#etc');
const $button = document.querySelector('button');
const $resultContainer = document.querySelector('.resultContainer');

const data = [];
data.push(
    {
        "role": "system",
        "content": "assistant는 예산과 할 작업, 같이 쓸 모니터 사양을 토대로 컴퓨터 견적을 추천해줍니다."
    },
    {
        "role":"user",
        "content": "CPU : ~ (약 ~만원), 메인보드 : ~ (약 ~만원), 메모리 : ~  (약 ~만원), GPU : ~ (약 ~만원), 저장장치 : ~ (약 ~만원),  파워 : ~ (약 ~만원), 총 견적 : 약 ~만원 이런식으로 결과를 보여줘"
    },
    {
        "role":"user",
        "content": "결과는 문장을 제외하고 줄바꿈해서 보여줘."
    }
)

const url = `https://estsoft-openai-api.jejucodingcamp.workers.dev/`;

$button.addEventListener('click', e => {
    e.preventDefault();
    const contents = $budget.value + ", " + $task.value + ", " + $monitor.value + ", " + $etc.value
    data.push({
        "role": "user",
        "content": contents
    })
    console.log(contents);

    chatGPTAPI()
})

function chatGPTAPI() {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        redirect: 'follow'
    })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            let result = res.choices[0].message.content;
            let arr = result.split('\n');
            console.log(arr);
            // 답변 온 것을 assistant로 저장
            $resultContainer.innerText = `${result}`
        })
}
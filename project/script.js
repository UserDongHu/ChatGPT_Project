const $input = document.querySelector('input');
const $button = document.querySelector('button');
const $answer = document.querySelector('.answer');

const data = [];
data.push({
    "role": "system",
    "content": "assistant는 점심시간 메뉴를 추천해주는 요리사입니다."
})

const url = `https://estsoft-openai-api.jejucodingcamp.workers.dev/`;

$button.addEventListener('click', e => {
    e.preventDefault();
    const contents = $input.value;
    data.push({
        "role": "user",
        "content": contents
    })
    $input.value = "";

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
            console.log(res.choices[0].message.content);
            // 답변 온 것을 assistant로 저장
            $answer.innerHTML = `<p>${res.choices[0].message.content}</p>`
        })
}
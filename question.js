export function createQuestion(){
    const form = document.createElement('form');
    
    const div = document.createElement('div');
    
    const label = document.createElement('label');
    label.setAttribute('for', 'inputquestion');
    label.textContent = '어떤 것이 궁금하신가요?';
    
    const textarea = document.createElement('input');
    textarea.setAttribute('type', 'text');
    textarea.setAttribute('id', 'inputquestion');
    textarea.setAttribute('placeholder', 'ex) rtx3060이 어떤지 알려줘, 모니터 출력이 안나와, 키보드 추천해줘')

    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.textContent = '질문하기';

    div.append(label, textarea);
    
    form.append(div, submitButton);
    
    return form;
}

export function createChat(text, isUser){
    const chat = document.createElement('div');
    chat.className = isUser ? 'userchat' : 'aichat';
    chat.textContent = text;
    return chat;
    
}
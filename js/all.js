const userHeight = document.querySelector('.heightInput');
const userWeight = document.querySelector('.weightInput');
const warn = document.querySelector('.warn');
const send = document.querySelector('.send');
const bmiList = document.querySelector('.bmiList');
const deleteAll = document.querySelector('.deleteAllBtn');
const levelCircle = document.querySelector('.levelCircle');
const levelResult = document.querySelector('.levelResult');
const result = document.querySelector('.result');
const resetInput = document.querySelector('.reset');
const pressEnter = document.querySelectorAll('input');
let data = JSON.parse(localStorage.getItem('userData')) || [];
let today=new Date();

send.addEventListener('click',getData,false);
deleteAll.addEventListener('click',deleteAllData,false);
bmiList.addEventListener('click',deleteList,false);
resetInput.addEventListener('click',reset,false);
updateList(data);

pressEnter.forEach((value) => {
    value.addEventListener('keyup',(e) =>{
        if(e.key === 'Enter'){
            getData(e);
        }
    }
    ,false)
});

function getData(e){
    let heightNum = Number(userHeight.value);
    let weightNum = Number(userWeight.value);
    let userLevel = '';
    let userColor = '';
    let marginRight = '';
    let BMI = (weightNum / ((heightNum/100)**2)).toFixed(2);
    switch(true){
        case (BMI <= 18.5):
            userLevel = '過輕'
            userColor = '#31baf9'
            marginRight = '80px'
        break;
        case (18.5 < BMI && BMI <= 25):
            userLevel = '理想'
            userColor = '#86d73f'
            marginRight = '80px'
        break;
        case (25 < BMI && BMI <= 30):
            userLevel = '過重'
            userColor = '#ff982d'
            marginRight = '80px'
        break;
        case (30 < BMI && BMI <= 35):
            userLevel = '輕度肥胖'
            userColor = '#ff6c03'
        break;
        case (35 < BMI && BMI <= 40):
            userLevel = '中度肥胖'
            userColor = '#ff6c03'
        break;
        case (40 < BMI):
            userLevel = '嚴重肥胖'
            userColor = '#ff1200'
        break;
    };
    if (!heightNum || !weightNum){
        warn.textContent = '*請輸入正確的身高體重'
        reset();
    }else{
        warn.textContent = '';
        let userDataList = {
            height : userHeight.value,
            weight : userWeight.value,
            bmi : BMI,
            level : userLevel,
            color : userColor,
            date: today.getDate(),
            month: (today.getMonth()+1),
            years: today.getFullYear(),
            mgr : marginRight,
        };
        data.push(userDataList);
        localStorage.setItem('userData',JSON.stringify(data));
        updateList(data);
        send.style.display = 'none';
        ShowLevelCircle(data);
    };
};

function ShowLevelCircle(data){
    levelCircle.style.display = 'flex';
    levelResult.style.display = 'block';
    for (let i = 0; i < data.length; i++) {
        result.textContent = `${data[i].bmi}`;
        levelCircle.style.color = `${data[i].color}`;
        levelCircle.style.border = `6px solid ${data[i].color}`;
        resetInput.style.background = `${data[i].color}`;
        levelResult.style.color = `${data[i].color}`;
        levelResult.textContent = `${data[i].level}`;
    }
};

function updateList(data){
    let str = '';
    for (let i = 0; i < data.length; i++) {
        str += `<ul class="bmiDetail" style="border-left: 7px solid ${data[i].color}">
                    <li style="margin-right:${data[i].mgr}">${data[i].level}</li>
                    <li><span>BMI</span>${data[i].bmi}</li>
                    <li><span>weight</span>${data[i].weight}kg</li>
                    <li><span>height</span>${data[i].height}cm</li>
                    <span>${data[i].month}-${data[i].date}-${data[i].years}</span>
                    <a href="#" data-num="${i}" class="fa-solid fa-trash-can"></a>
                </ul>`;
    };
    bmiList.innerHTML = str;
};

function reset(e){
    send.style.display = 'flex';
    levelCircle.style.display = 'none';
    levelResult.style.display = 'none';
    userHeight.value = '';
    userWeight.value = '';
};

function deleteList(e){
    e.preventDefault();
    if(e.target.nodeName !== 'A')return;
    let num = e.target.dataset.num;
    data.splice(num,1);
    localStorage.setItem('userData',JSON.stringify(data));
    updateList(data);
};

function deleteAllData(){
    data = [];
    localStorage.setItem('userData',JSON.stringify(data));
    updateList(data);
    reset();
    warn.textContent = '';
};
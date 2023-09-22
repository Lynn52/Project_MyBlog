import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import React, {Component} from 'react';

function App() {
let [title, changeTitle] = useState(["모던 자바스크립트", "HTML5", "C++"]);
let [입력값, 입력값변경] = useState("");
let [modal, setModal] = useState(false); //true|false, 1|0, 참|거짓
//title 배열 길이와 동일한 길이의 배열 생성, 0으로 값을 채워 초기화
//title 배열 길이 변경되어도 good 배열 길이 역시 동적으로 초기화된다!
let [good, goodState] = useState(new Array(title.length).fill(0));
let [titleKey, setTitle] = useState(0);
const dynamicCom = <p>동적으로 전달된 컴포넌트</p>;
  function HandleClick(){
    alert('버튼이 클릭되었습니다!');
  }

const today = new Date(); //현재 날짜 가져오기
const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`


  return (
    <div className="App">
      <div className="black-nav">
        <ShowName name ={"Hyerin"} style={{color:"grey"}}/>
      </div>
      {/* <button onClick={
        ()=>{
        //title[0] = '옛날 자바스크립트',
        //changeTitle(title);
        //원본 데이터가 있으면 원본 데이터 백업
        let copy = [...title]; //사실 위의 title은 주소값이었던 것! ...은 배열 해체
        copy[0] = '옛날 자바스크립트';
        //copy.sort();
        changeTitle(copy);
        }
      }>글제목 바꾸기 버튼</button> */}

      <div className='mg'>
        <input className='title'
                type="text"
                value = {입력값}
                placeholder='텍스트를 입력하세요'
                onChange={function(e){
                  입력값변경(e.target.value);}}></input>
        <button onClick={()=>{
          let copy = [...title];
          copy.unshift(입력값);
          changeTitle(copy);
          입력값변경("");
        }}>등록</button>
      </div>

      <div className='list'>
      {
        title.map(function(index, i){
          return(
            <div className="innerList" key = {i} style={{textAlign:'left'}}>
              <div className='groupbox'>
              <h4 className="textbox" onClick={()=>{
                modal == true ? setModal(false) : setModal(true);
                setTitle(i);
              }}>
                <p id='date'>{formattedDate}</p>
                {title[i]}
              <span onClick={
                (e)=>{
                  e.stopPropagation(); //이벤트 버블링을 막기 위함
                  let copy = [...good];
                  copy[i] = copy[i] + 1;
                  goodState(copy);
                }
              }>❤️</span>{good[i]}</h4>
              <div className='deletebox'>
                <button onClick={(e)=>{
                  e.stopPropagation();
                  let copy = [...title];
                  copy.splice(i, 1);
                  changeTitle(copy);
                }}>삭제</button>
              </div>
              </div>
            </div>
          )
        })
      }
    </div>
      {
        modal == true ? <Modal titleKey = {titleKey} changeTitle = {changeTitle} background = {'antiquewhite'} title = {title}/> : null 
      }

      <DailyRecord />
      <UserProfile />
      
      {/* <MyButton onClick={HandleClick} label="클릭하세요"/> */}
      {/* <ChildComponent dynamicComElement={dynamicCom}/> */}
    
      {/* <Modal2></Modal2> */}
  </div>
  );
}

//props 자리에 state
class Modal2 extends Component{
  constructor(props){
    super(props)   
    this.state = {
      name : 'kim',
      age : 20
    }
  }
  render(){
    return(
      <div>
        안녕 {this.props.age} 
        <button onClick={()=>{
          this.setState({age : 50})
        }}>버튼</button>
      </div>
    )
  }
}

// function App(){
//   function handleClick(){
//     alert("버튼이 클릭되었습니다!");
//   }

//   return(
//     <div>
//       <MyButton onClick={handleClick} lable="클릭하세요" />
//     </div>
//   );
// }

function MyButton(props){
  return(
    <div>
      <button onClick={props.onClick}>{props.label}</button>
    </div>
  );
}

// let ChildComponent =(props)=>{
//   return(
//     <div>
//       <p>자식컴포넌트</p>
//       {props.dynamicComElement}
//     </div>
//   );
// }

let ShowName = (props)=>{
  return(
    <div>
      <p>Hello, {props.name}</p>
      <h2>나의 개발 블로그</h2>
    </div>
    
  )
}

//화살표 함수 이용해서 함수 표현식 사용
//Modal 컴포넌트 상단에서 호출(=<Modal></Modal>)
let Modal = (props)=>{ //props : 함수에서 받는 매개변수
  //자바스크립트 코드
  return(
    <div className='list'>
      <div className='modal' style={{background : props.background}}>
        <div className='groupbox'>
          <div>
            <h4>{props.title[props.titleKey]}</h4>
            <p>날짜</p>
            <p>상세 정보</p>
          </div>
          <div>
          <button onClick={()=>{
            props.changeTitle(["옛날 자바스크립트", "HTML5", "C++"]);
            }}>글 수정</button>
          </div>
        </div>
      </div>
    </div>
    
  )
}

let DailyRecord = ()=>{
  return(
    <div className='list'>
      <div className='modal'>
        <div className='groupbox'>
          <div><h4>방문자수</h4></div>
          <div>조회수</div>
        </div>
      </div>
    </div>
  )
};

function UserProfile(){
  const[user, setUser] = useState( //접근 시, user.username, user.useremail
                {
                  username : '',
                  useremail : ''
                }
  );

  function handleInputChange(e){
    const{name, value} = e.target;
    setUser({...user, [name]:value});
  }

  return(
    <>
      <div className='list'>
        <div className='groupbox'>
          <div>
          <h2>프로필 입력</h2>
            <input className='profile'
                    type = 'text'
                    name = 'username'
                    value = {user.username}
                    placeholder = '사용자 이름'
                    onChange = {handleInputChange}></input>
            <input className='profile'
                    type = 'text'
                    name = 'useremail'
                    value = {user.useremail}
                    placeholder = '이메일 주소'
                    onChange = {handleInputChange}></input>
          </div>
          <div>
            <h2>프로필 정보</h2>
            <p>사용자 이름 : <span id="settingBox">{user.username}</span></p>
            <p>이메일 주소 : {user.useremail}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;
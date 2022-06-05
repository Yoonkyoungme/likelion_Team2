import React, {useRef, useState,useEffect,render } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Form, Button,Container,FormCheck} from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function 전체강의페이지(){
    const [강의정보,강의정보설정] = useState([]);
    const [선택강의,선택강의설정] = useState([]);
    const [강의명검색, 강의명검색설정] = useState(null);

    const 검색어 = useRef(""); 

    useEffect(()=>{
        axios.get('http://localhost:3001/lecture_infor')
        .then(res => {
            console.log('res: ', res); console.log('res.data: ', res.data);
            return res.data;})
        .then(data =>{
            강의정보설정(data);
        });
    },[]);

    function click(e){  
        const target_id = e.target.id;
        let copy = [...선택강의];
        let check = false;
        for(let i=0; i<copy.length; i++){
            if(copy[i] == target_id){
                copy.splice(i,1);
                i--;
                선택강의설정(copy)
                check = true;}
        }
        if(!check){copy.push(target_id); 선택강의설정(copy);}
        
    }

    function onSubmit(e){
        e.preventDefault();
        // console.log("선택강의",선택강의);
        axios.post("http://localhost:3001/select_lecture", {
            선택강의목록 : 선택강의
        });
    }

    return(
        <>
        <div style={{textAlign:"center",paddingTop:"30px",paddingBottom:"30px"}}>
            <form>
            <input type="text" className="search-form" placeholder=" 강의명 검색하기" ref={검색어}/>
            <Link to = "/all-lecture">
            <button class="btn btn-outline-success" 
            style={{paddingBottom:"3px",paddingTop:"7px", margin:"0px"}} type="submit" onClick={()=>{강의명검색설정(검색어.current.value)}}>
                Search</button></Link>
            </form>
        </div>
        <div style={{width:"90%",margin:"auto"}}>
            
            <table className="lecture-table">
                <tr className="lecture-infor">
                    <td>개설영역</td>
                    <td>학년</td>
                    <td>학수번호</td>
                    <td>강의명</td>
                    <td>담당교수</td>
                    <td>학점</td>                
                    <td>시간</td>                
                    <td>강의시간</td>                
                    <td>강의실</td>                
                    <td>지원인원수</td>
                    <td>제한인원수</td>
                    <td>비고</td>
                    <td>평점</td>
                    <td>선택</td>
                </tr>
                <tbody>
                    {
                        강의정보.map((function(a,i){
                            {
                                if(강의명검색 !== null){
                                    if(a["lecture_name"].includes(강의명검색)){
                                        return(
                                            <tr className="lecture-infor">
                                                <td>{a['area']}</td>
                                                <td>{a['year']}</td>
                                                <td>{a["lecture_number"]}</td>
                                                <td>{a["lecture_name"]}</td>
                                                <td>{a["professor"]}</td>
                                                <td>{a["credit"]}</td>
                                                <td>{a["time"]}</td>
                                                <td>{a["lecture_time"]}</td>
                                                <td>{a["lecture_room"]}</td>
                                                <td>{a["apply_count"]}</td>
                                                <td>{a["limit_count"]}</td>
                                                <td>{a["note"]}</td>
                                                <td>{a["star_point"]}</td>
                                                <td><FormCheck id = {a["lecture_number"]} onClick={(e)=>click(e)}/></td>
                                            </tr>)
                                    }
                                }
                                else{
                                    return(
                                        <tr className="lecture-infor">
                                            <td>{a['area']}</td>
                                            <td>{a['year']}</td>
                                            <td>{a["lecture_number"]}</td>
                                            <td>{a["lecture_name"]}</td>
                                            <td>{a["professor"]}</td>
                                            <td>{a["credit"]}</td>
                                            <td>{a["time"]}</td>
                                            <td>{a["lecture_time"]}</td>
                                            <td>{a["lecture_room"]}</td>
                                            <td>{a["apply_count"]}</td>
                                            <td>{a["limit_count"]}</td>
                                            <td>{a["note"]}</td>
                                            <td>{a["star_point"]}</td>
                                            <td><FormCheck id = {a["lecture_number"]} onClick={(e)=>click(e)}/></td>
                                        </tr>)
                                }
                            }
                           
                        }))
                    }
                    
                </tbody>
            </table>
        </div>
        <div style={{paddingTop:"50px",textAlign:"center"}}>
            <Button variant="success" size="lg" onClick={onSubmit}>
                <Link to = "/to-search" style={{textDecoration: 'none',color:'white'}}>
                    추가하기</Link>
            </Button>
        </div>
        
      </>
    )
}


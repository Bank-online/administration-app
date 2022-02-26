import React ,{useEffect,useState} from 'react';
import Layout from 'renderer/components/Layout';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { useRecoilState } from 'recoil';
import userHelper from '../helpers/UserHelper';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  const [user,setUser] =useRecoilState(userHelper.userAtom);
  const [isLogin,setIslogin] = useRecoilState(userHelper.isLoginAtom)
  useEffect(()=>{
    localStorage.clear()
    setUser(null)
    setIslogin(false)
    setTimeout(()=>{
      navigate('/')
    },1000)
  },[user])
  
  return (
    <Backdrop
      sx={{ color: '#black', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
      onClick={}
    >
    <div>
    <p style={{color : "white",zIndex: (theme) => theme.zIndex.drawer + 1 ,fontSize :"1.5em"}}>🚪 A bientot...</p>
     <CircularProgress color="inherit"  sx={{marginLeft : "4em"} }/>
    </div>
     
    </Backdrop>
  );
};

export default Logout;

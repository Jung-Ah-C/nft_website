import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Home.css';

import { BsLink45Deg } from "react-icons/bs";
import { BsDiscord } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";

// material UI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from "@mui/material/Tooltip";
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

// bootStrap
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// components
import Header from '../component/Header.js';
import Footer from '../component/Footer.js';
import ScrollToTop from '../component/ScrollToTop.js';
import mobileGuide from '../img/mobileGuide.png';

// 테이블 행 내용과 상세정보
function Row (props) {
  const [open, setOpen] = React.useState(false);  
  const { row } = props;
    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell align="center">
              <Carousel variant="dark" indicators={false}>
                  {
                    row.image && row.image.map((item) => (
                      <Carousel.Item>
                        <a href={row.weblink} alt="web_link" target="_blank">
                          <img
                          className="d-block w-100"
                          src={item}
                          alt="NFT Image" 
                          maxWidth="30"
                          height="auto"
                          />
                        </a>
                      </Carousel.Item>
                    ))
                  }
              </Carousel>
            </TableCell>
            <TableCell align="center">
              {row.name}
            </TableCell>
            <TableCell align="center" style={{ color: 'red' }}>{row.high_price}</TableCell>
            <TableCell align="center">
                <a href={row.weblink} style={{ color: '#182B4B' }} alt="webLink" target="_blank"><BsLink45Deg style={{ width: '20', height: '20' }}/></a>
                <a href={row.twitlink} style={{ color: '#33B0FF' }} alt="twitterLink" target="_blank"><BsTwitter style={{ width: '20', height: '20' }}/></a>
                <a href={row.discordlink} style={{ color: '#334AFF' }} alt="discordLink" target="_blank"><BsDiscord style={{ width: '20', height: '20' }}/></a>
            </TableCell>
            <TableCell align="center">{row.date}</TableCell>
            <TableCell align="center" style={{ color: 'blue' }}>{row.price}</TableCell>
            <TableCell align="center">{row.count}</TableCell>
          </TableRow>
          <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1, justifyContent: "center" }}>
                <Typography variant="h6" gutterBottom component="div">
                  민팅정보
                </Typography>
                <Table size="small" aria-label="details">
                  <TableHead>
                    <TableRow>
                      <TableCell>종류</TableCell>
                      <TableCell>날짜</TableCell>
                      <TableCell>시간</TableCell>
                      <TableCell>민팅수량</TableCell>
                      <TableCell>비고</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                      {
                        row.schedule && row.schedule.map(item => ( 
                        <TableRow>
                          <TableCell>{item.category}</TableCell>
                          <TableCell>{item.date}</TableCell>
                          <TableCell>{item.time}</TableCell>
                          <TableCell>{item.count}</TableCell>
                          <TableCell>{item.etc}</TableCell>
                        </TableRow>
                        ))
                      }
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

export default function Home() {
    const [tableData, setTableData] = useState('');
    const [best, setBest] = useState('');
    useEffect(() => {
      const fetchItems = async () => {
        try {
          const result = await axios(`http://180.228.243.235/schedules`);
          // console.log('Home table data : ', result.data);
          setTableData(result.data);
        } catch(err) {
          console.log('cannot get table data.', err);
        }
        axios.get(`http://180.228.243.235/schedules/0/bests`)
          .then((response) => {
            // console.log('Home best data : ', response.data);
            setBest(response.data);
          })
          .catch(err => console.log('cannot get best data.', err));
      };
      fetchItems();
    }, []);
    
    return (
        <React.Fragment>
            <div className="AppBar">
                <Header/>
            </div>
            <Toolbar id="back-to-top-anchor" />

            {/* <div className="adfit"/> */}
            
            <div className="content">
                {/* 모바일 버전  */}
                <Box sx={{ marginTop : 10, display: { xs: "flex", md: "none" }, textAlign : 'center' }}>
                    <img src={mobileGuide} width={400} height='auto'/>
                </Box>
                <Box 
                    className="home-content"
                    sx={{ 
                        height: 'auto',
                        marginBottom : 7
                    }}
                >
                    <Grid 
                        container 
                        justifyContent="center" 
                        alignItems="center"
                    >
                        {/* 금주의 인기 NFT */}
                          <Grid item xs={11}>
                            <TableContainer component={Paper} style={{ marginBottom: 70 }}>
                                <Table stickyHeader sx={{ minWidth: 800 }}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" width="5%"></TableCell>
                                            <TableCell align="center" width="20%" style={{ color: 'red' }}><b>금주의 인기 프로젝트</b></TableCell>
                                            <TableCell align="center" width="10%"></TableCell>
                                            <Tooltip title="시장 상황에 따라 가격이 변동될 수 있습니다.">
                                                <TableCell align="center" width="10%"><b>최고가</b></TableCell>
                                            </Tooltip>
                                            <TableCell align="center" width="20%"><b>링크</b></TableCell>
                                            <TableCell align="center" width="20%"><b>민팅날짜</b></TableCell>
                                            <TableCell align="center" width="10%"><b>민팅가격</b></TableCell>
                                            <TableCell align="center" width="10%"><b>수량</b></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {
                                      best && best.map((row) => (
                                        <Row key={row.id} row={row}/>
                                      ))
                                    }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>

                        {/* NFT 정보 테이블 */}
                        <Grid item xs={11}>
                            <TableContainer component={Paper}>
                                <Table stickyHeader sx={{ minWidth: 800 }}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center" width="5%"></TableCell>
                                            <TableCell align="center" width="20%" style={{ color: 'blue' }}><b>진행중인 프로젝트</b></TableCell>
                                            <TableCell align="center" width="10%"></TableCell>
                                            <Tooltip title="시장 상황에 따라 가격이 변동될 수 있습니다.">
                                                <TableCell align="center" width="10%"><b>최고가</b></TableCell>
                                            </Tooltip>
                                            <TableCell align="center" width="20%"><b>링크</b></TableCell>
                                            <TableCell align="center" width="20%"><b>민팅날짜</b></TableCell>
                                            <TableCell align="center" width="10%"><b>민팅가격</b></TableCell>
                                            <TableCell align="center" width="10%"><b>수량</b></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {
                                      tableData && tableData.map((row) => (
                                        <Row key={row.id} row={row}/>
                                      ))
                                    }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </Box>
            </div>
            <ScrollToTop/>
            <div className="Footer">
                <Footer/>
            </div>
        </React.Fragment>
    )
}
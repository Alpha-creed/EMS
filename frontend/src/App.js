import './App.css';
import react, { useEffect,useState} from 'react';
import  {Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom'
import axios from 'axios'
import history from "./history"
import jwt from "jsonwebtoken";

function App() {

 const navigate=useNavigate()
  const [val,setVal] = useState({
    data:{
      _id:localStorage.getItem("_id") || "",
      Account:localStorage.getItem("Account") || "",
      Name:localStorage.getItem("Name") ||""
  },
      loading:false,
      pass:true,
      isLogin:localStorage.getItem("isLogin") == "true",
      firstTimeAlert:true,
  })

  const updateFirstTimeAlert = () => {
    setVal((prevState) => ({
      ...prevState,
      firstTimeAlert: false,
    }));
  };

  const dataAdIsLogin=()=>{
    val.data._id,
    val.data.Account,
    val.data.Name,
    val.isLogin
  }

  const alertFirstTime=()=>{
    if(val.firstTimeAlert && !val.isLogin){
        setTimeout(()=>{
          window.alert(
            `
            To explore the feature of this application here is the temporary id and pass for all account
      Admin:
          id:admin@gmail.com
          pass:admin
      Hr:
          id:hr@gmail.com
          pass:hr
      Employee:
          id:emp@gmail.com
          pass:emp
            `
          )
        },500)
       updateFirstTimeAlert()
    }
}

useEffect(()=>{
  alertFirstTime()
},[])
const login=(id,pass)=>{
  
  let bodyLogin = {
    email: id,
    password: pass
  };
  axios
  .post("http://localhost:5000/api/login", bodyLogin)
  .then(res => {
    // console.log(decodedData.Account);
    console.log(jwt.decode(res.data));
    var decodedData = jwt.decode(res.data);
    localStorage.setItem("token", res.data);

    if (
      (res == undefined ||
        res == null ||
        decodedData.Account == undefined ||
        decodedData.Account == null) &&
      !(
        decodedData.Account == 1 ||
        decodedData.Account == 2 ||
        decodedData.Account == 3
      )
    ) {
      setVal((prevState) => ({
        ...prevState,
        pass: false,
        loading:false,
      }));
    } else {
      if (decodedData.Account == 1) {
           // this.setState({ data: decodedData });
            // localStorage.setItem('data', JSON.stringfy(decodedData));
            setVal((prevState) => ({
              ...prevState,
              pass: true,
              loading:false,
              isLogin: true, 
            }));
            localStorage.setItem("isLogin", true);
            // localStorage.setItem('isLogin', 'true');
            localStorage.setItem("Account", 1);
            localStorage.setItem("_id", decodedData["_id"]);
            localStorage.setItem(
              "Name",
              decodedData["FirstName"] + " " + decodedData["LastName"]
            );
            dataAdIsLogin()
            history.push("#/admin/role");
          }
          if (decodedData.Account == 2) {
            // this.setState({ data: decodedData });
            setVal((prevState) => ({
              ...prevState,
              pass: true,
              loading:false,
              isLogin: true, 
            }));
            localStorage.setItem("isLogin", true);

            localStorage.setItem("Account", 2);
            localStorage.setItem("_id", decodedData["_id"]);
            localStorage.setItem(
              "Name",
              decodedData["FirstName"] + " " + decodedData["LastName"]
            );
            dataAdIsLogin()
            history.push("#/hr/employee");
          }
          if (decodedData.Account == 3) {
            // this.setState({ data: decodedData });
            setVal((prevState) => ({
              ...prevState,
              pass: true,
              loading:false,
              isLogin: true, 
            }));
         
            localStorage.setItem("isLogin", true);

            localStorage.setItem("Account", 3);
            localStorage.setItem("_id", decodedData["_id"]);
            localStorage.setItem(
              "Name",
              decodedData["FirstName"] + " " + decodedData["LastName"]
            );
            dataAdIsLogin();
            history.push("#/employee/" + decodedData._id + "/personal-info");
          }
        }

        //  console.log(decodedData);
        //  console.log(`decodedData.toString()=="false" `,decodedData.toString()=="false" );

        //  if(decodedData.toString()=="false")

        //  { console.log("1");
        //  this.setState({ pass: false })
        //  this.setState({ loading: false }); ;

        // }else{
        //   console.log("2");
        //   this.setState({ pass: true });
        //  this.setState({ loading: false });
        //  this.setState({ data: decodedData});
        //  this.setState({ isLogin: true });

        // }
      })
      .catch(err => {
        console.log(err);
        setVal((prevState) => ({
          ...prevState,
          pass: false,
          loading:false,
        }));
      });
}
const handleSubmit=(e)=>{
  e.preventDefault();
  setVal((prevState) => ({
    ...prevState,
    pass: true,
    loading:true,
  }));
  login(e.target[0].value, e.target[1].value);
  e.target.reset();
}

const handleLogout = (e) => {
  console.log("logout");
  localStorage.clear();
  dataAdIsLogin()
};

  return (
    <Router history={history}>
      <Routes>
      <Route path="/login" element={
      val.data["Account"] === "1"?(
        // <Navigate to="/admin" />
        navigate("/admin")
      ):val.data["Account"] ==="2"?(
        // <Navigate to="/hr" />
        navigate("/hr")
      ):val.data["Account"] ==="3"?(
        navigate("/employee")
      ):(
      <Login 
        onSubmit={handleSubmit} 
        loading={val.loading} 
        pass={val.pass} 
        />)
        } 
        />

        <Route
          path="/admin"
          element={
            val.data["Account"] === "1" ? (
              <DashboardAdmin 
                data={val.data} 
                onLogout={handleLogout} 
                />
            ) : (
              navigate("/login")
            )
          }
        />
        <Route
          path="/hr"
          element={
            val.data["Account"] === "2" ? (
              <DashboardHR data={val.data} onLogout={handleLogout} />
            ) : (
              navigate("/login")
            )
          }
        />
        <Route
          path="/employee"
          element={
            val.data["Account"] === "3" ? (
              <DashboardEmployee data={val.data} onLogout={handleLogout} />
            ) : (
              navigate("/login")
            )
          }
        />
        <Route path="*" element={useNavigate("/login")}/>
         {/* navigate("/login") */}
      </Routes>
    </Router>
  );
}

export default App;

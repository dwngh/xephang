function getInfo(){
  let user = {
    name:null,
    school:null,
    class:null,
    sub1:null,
    sub2:null,
    sub3:null,
    sub4:null,
    sub5:null,
    ip: null
  };
  user.name = document.getElementById("name").value;
  user.school = document.getElementById("school").value;
  user.class = document.getElementById("class").value;
  user.sub1 = parseInt(document.getElementById("sub1").value);
  user.sub2 = parseInt(document.getElementById("sub2").value);
  user.sub3 = parseInt(document.getElementById("sub3").value);
  user.sub4 = parseInt(document.getElementById("sub4").value);
  user.sub5 = parseInt(document.getElementById("sub5").value);
      return user;
}

function sendInfo(){

  let req1 = new XMLHttpRequest();
  req1.onreadystatechange = () => {
    if (req1.readyState == XMLHttpRequest.DONE) {
      if (document.cookie != "alreadySet")
      $.get('https://www.cloudflare.com/cdn-cgi/trace', function(data) {
        console.log(data);
        let info = getInfo();
        info.ip = data.ip;
        if (isNaN(info.sub1) || isNaN(info.sub2) || isNaN(info.sub3) || isNaN(info.sub4) || isNaN(info.sub5) || info.name == null || info.school == null || info.class == null) alert("Làm ơn hãy nhập đầy đủ và đúng");
        else {
          let req = new XMLHttpRequest();
          let list = JSON.parse(req1.responseText);
          list.push(info);

          list.sort(function(a, b) {
              let a_value = a.sub1 + a.sub2 + a.sub3 + a.sub4 + a.sub5;
              let b_value = b.sub1 + b.sub2 + b.sub3 + b.sub4 + b.sub5;
              return b_value - a_value;
          });
          console.log(list);
          req.onreadystatechange = () => {
            if (req.readyState == XMLHttpRequest.DONE) {
              console.log(req.responseText);
              document.cookie = "alreadySet";
              alert("Thành công")
            }
          }
          req.open("PUT", "https://api.jsonbin.io/b/5eae76658284f36af7b48a97", true);
          req.setRequestHeader("secret-key", sercretKey);
          req.setRequestHeader("Content-Type", "application/json");
          req.send(JSON.stringify(list));
        }
      });
      else {alert("Bạn đã nhập rồi");}
    }
  };

  req1.open("GET", "https://api.jsonbin.io/b/5eae76658284f36af7b48a97/latest", true);
  req1.setRequestHeader("secret-key", sercretKey);
  req1.send();
}

function render(){

  let req = new XMLHttpRequest();

  req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
      let r = "";
      r += "<thead><tr><th scope='col'>#</th><th scope='col'>Họ và tên</th><th scope='col'>Khối</th><th scope='col'>Trường</th><th scope='col'>Điểm tổng</th></tr></thead><tbody>";
      let list = JSON.parse(req.responseText);
      console.log(list);
      for (let i = 0; i < list.length; i++){
        r+= "<tr><td>"+ i.toString() + "</td><td>" + list[i].name + "</td><td>" + list[i].class + "</td><td>" + list[i].school + "</td><td>" + (list[i].sub1 + list[i].sub2 + list[i].sub3 + list[i].sub4 + list[i].sub5).toString() + "</td></tr>";
      }
      r += "</tbody>";
      document.getElementById("result").innerHTML = "";
      document.getElementById("result").innerHTML = r;
    }
  };

  req.open("GET", "https://api.jsonbin.io/b/5eae76658284f36af7b48a97/latest", true);
  req.setRequestHeader("secret-key", sercretKey);
  req.send();

}

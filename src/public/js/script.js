
async function updateStatus() {
  const response = await fetch("http://localhost:3000/status");
  const onlineStatus = await response.json();
  const status = document.getElementsByClassName("status")[0];
  if(onlineStatus.status == "offline" || onlineStatus.status == undefined) {
    status.innerText = "OFFLINE";
    status.style.color =  "#df1b1b";
    console.log(`Status do usuário é Offline: ${onlineStatus}`);
  } else {
    status.innerText = "ONLINE";
    status.style.color =  "#df1b1b";
    console.log(`Status do usuário é Online: ${onlineStatus}`);
  }

  console.log(onlineStatus);
  
}



window.onload = async () => {
  // await updateStatus();
  setInterval(async () => {
    await updateStatus();
  }, 5000);
}

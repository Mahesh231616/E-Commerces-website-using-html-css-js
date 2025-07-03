var userdetails = {};
var navdata = 0;
var curruser = "";
var signupdata = 0;
var shoppagedata = 1;
var logindata = 0;
var cartpagedata = 0;
var totalcost = 0;

function addtocart(data) {
    if (curruser == "") {
        alert("Login to Add item to cart");
    } else {
        userdetails[curruser][3].push(data);
        alert("Product Added to Cart!");
    }
}

function nav1() {
    let b = document.getElementById("b");
    let c = document.getElementById("c");
    let d = document.getElementById("d");
    let display = navdata === 0 ? "block" : "none";
    b.style.display = c.style.display = d.style.display = display;
    navdata = 1 - navdata;
}

function signupon() {
    if (signupdata === 0) {
        document.getElementById("shop-container").style.display = "none";
        document.getElementById("x").style.display = "block";
        signupdata = 1;
    }
}

function signupuser() {
    let name = document.getElementById("name").value;
    let uname = document.getElementById("uname").value;
    let email = document.getElementById("email").value;
    let pwd = document.getElementById("pwd").value;
    userdetails[uname] = [name, email, pwd, []];
    alert("Signup Success!");
    document.getElementById("x").style.display = "none";
    signupdata = 0;
    document.getElementById("y").style.display = "block";
    logindata = 1;
}

function loginon() {
    if (logindata === 0) {
        if (signupdata === 1) {
            document.getElementById("x").style.display = "none";
            signupdata = 0;
        }
        document.getElementById("y").style.display = "block";
        logindata = 1;
    } else {
        document.getElementById("y").style.display = "none";
        logindata = 0;
    }
}

function loginuser() {
    let uname = document.getElementById("luname").value;
    let pwd = document.getElementById("lpwd").value;
    if (userdetails[uname] && userdetails[uname][2] === pwd) {
        alert("Login Success");
        curruser = uname;
        document.getElementById("y").style.display = "none";
        document.getElementById("shop-container").style.display = "block";
        logindata = 0;
        shoppagedata = 1;
    } else {
        alert("Invalid Username or Password");
    }
}

function showcart() {
    if (shoppagedata === 1) {
        document.getElementById("shop-container").style.display = "none";
        shoppagedata = 0;
    }

    let orders = userdetails[curruser][3];
    document.getElementById("tc").innerHTML = "";
    totalcost = 0;

    for (let item of orders) {
        let tr = document.createElement("tr");
        let tdName = document.createElement("td");
        tdName.textContent = item[0];
        tr.appendChild(tdName);

        let tdPrice = document.createElement("td");
        tdPrice.textContent = item[1];
        totalcost += item[1];
        tr.appendChild(tdPrice);

        document.getElementById("tc").appendChild(tr);
    }

    document.getElementById("totalAmount").textContent = totalcost;
    document.getElementById("z-container").style.display = "block";
    cartpagedata = 1;
}

function pay() {
    var options = {
        key: "rzp_test_uWXUS9CmbPx9dh",
        amount: totalcost * 100,
        currency: "INR",
        description: "Products about Cameras",
        handler: function (response) {
            alert("Payment Successful!");
            document.getElementById("z-container").style.display = "none";
            cartpagedata = 0;
            document.getElementById("shop-container").style.display = "block";
            shoppagedata = 1;
        },
        theme: { color: "lightblue" }
    };

    var rzp = new Razorpay(options);
    rzp.on('payment.failed', function () {
        alert("Payment Failed");
    });
    rzp.open();
}

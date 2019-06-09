function markedMes() {
    alert("Bạn đã bookmark truyện này.");
}

function mark(){
    document.getElementById("markForm").submit();
    alert("Bookmark thành công.");
    document.getElementById("markSign").className = "glyphicon glyphicon-bookmark";
}

function loginToMark() {
    alert("Bạn cần đăng nhập để book mark truyện này.");
}
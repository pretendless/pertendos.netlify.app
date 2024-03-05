document.addEventListener("DOMContentLoaded", docReady);
function docReady()
{
    sessionStorage.setItem('is_reloaded', 'no');
    if(sessionStorage.getItem('is_reloaded') == 'no')
    {
        sessionStorage.setItem('is_reloaded', 'yes');
        setTimeout(showPop, 500);
    }
}

function showPop()
{
    document.getElementsByClassName('divPop')[0].style.display = 'block';
    sessionStorage.setItem('is_reloaded', 'no');
}

function closePop()
{
    document.getElementsByClassName('divPop')[0].style.display = 'none';
}
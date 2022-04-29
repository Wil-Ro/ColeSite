function toggleContact(button)
{
    if (button.innerHTML == "contact me")
    {
        button.innerHTML = "back"
        document.getElementById("contactBar").style = "font-size: 1.5rem;"
    }
    else
    {
        button.innerHTML = "contact me"
        document.getElementById("contactBar").style = "font-size: 0;"
    }
}
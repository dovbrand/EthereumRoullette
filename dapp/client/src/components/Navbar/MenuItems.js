
/* we create an array so that we can keep all the menu names in here so when ever we want to changeit 
, update or add extra code to it, w ehave it right here and we dont have to 
manually type in the tags.    */
//cName is for importing class name without having to manuallt type it in
import image1 from './Navbarpics/how-to-icon.png'
import image2 from './Navbarpics/rankings-icon.png'
import image3 from './Navbarpics/account-icon.png'
import image4 from './Navbarpics/logout-icon.png' 
const MenuItems =[
    {
        title:'How to Play',
        url:'#',
        cName:'nav-links',
        icon: image1
    },
    {
        title:'Rankings',
        url:'#',
        cName:'nav-links',
        icon: image2  
    },
    {
        title:'Account',
        url:'#',
        cName:'nav-links',
        icon: image3
    },
    {
        title:'Logout',
        url:'#',
        cName:'nav-links',
        icon: image4
    },
   
    
]

export default MenuItems;
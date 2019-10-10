export  function createCampaignURL(data){
    var name = data.name;

    name = name.replace(/\s/g, "")

    return `/ca/${name}?id=${data.id}&name=*|FNAME|* *|LNAME|*&email=*|EMAIL|*`;

  }
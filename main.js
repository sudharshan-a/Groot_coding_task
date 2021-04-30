
const HOST = `https://hacker-news.firebaseio.com/v0/item/`
let currentTab=0;

const stories = async (tab)=>{
    const tabLink = [
        `https://hacker-news.firebaseio.com/v0/topstories.json`,
        `https://hacker-news.firebaseio.com/v0/newstories.json`,
        `https://hacker-news.firebaseio.com/v0/beststories.json`
    ]
    let result = await $.get(tabLink[tab]);

    // console.log(tab)

    $('.cardContainer').html('');

    for(let storyId of result){
        // console.log(storyId)
        if(currentTab!=tab)
            break;
            
        let story = await $.get(`${HOST}${storyId}.json`);

        const date = new Date(story.time);
        const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']


        $('.cardContainer').append(`
        <div class="storyCard">
            <div class="storyTitle">${story.title}</div>
            <div class="storyDetails">
                <div class="storyDate">${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}</div>
                <div class="storyBy">By: <span>${story.by}</span> </div>
            </div>
        </div>
        `)
    }
    // console.log(result)
}

$(document).ready(async ()=>{
    stories(0);
})


$('.tab').click((event)=>{
    // console.log($(event.target).attr('class'))
    currentTab=$(event.target).attr('index');
    $('.tab').removeClass('tabSelected');
    $(event.target).addClass('tabSelected');
    stories(currentTab);
})



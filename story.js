const HOST = `https://hacker-news.firebaseio.com/v0/item/`
const MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

$(document).ready(async ()=>{

    let queries = document.location.href.split('?')[1];
    let storyId = ''

    for(let query of queries.split("&")){
        query=query.split('=');
        
        if(query[0]=='storyId'){
            storyId=query[1];
            break;
        }
    }
        
    
    if(storyId=='')
        document.location.replace('/')

    else{
        getStory(storyId);
        getComments(storyId);
    }

})

const getStory = async (storyId)=>{
    const story = await $.get(`${HOST}${storyId}.json`);

    const date = new Date(story.time);
    
    $('.storyUrl').attr('href', story.url)
    $('.storyTitle').html(story.title)
    $('.date').html(`${date.getDate()} ${MONTH[date.getMonth()]} ${date.getFullYear()}`)
    $('.time').html(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)
    $('.by').html(story.by)
    $('.score').html(story.score)
    $('.noOfComments').html(story.descendants)
}


const getComments = async (storyId)=>{
    const story = await $.get(`${HOST}${storyId}.json`);
    
    for(let commentId of story.kids){
        const comment = await $.get(`${HOST}${commentId}.json`);
        const date = new Date(comment.time);

        $('.cardContainer').append(`
            <div class="commentCard">
                <div class="commentDetails">
                    <div class="commentBy">${comment.by}</div>
                    <div class="commentDate">${date.getDate()} ${MONTH[date.getMonth()]} ${date.getFullYear()}</div>
                </div>
                <div class="commentText">${comment.text}</div>
            </div>`)
    }
}
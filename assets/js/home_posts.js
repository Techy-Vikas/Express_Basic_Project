{
    //method to submit the form data for new post using AJAX
    let createPost = () => {
        let newpostForm = $('#new-post-form');
        console.log(newpostForm.serialize());

        newpostForm.submit((e)=>{
            e.preventDefault();
            $.ajax({
                type : 'post',
                url : '/posts/create',
                data: newpostForm.serialize(),
                success: (data)=>{
                    console.log(data);
                    let newPost = newPostDom(data.data.post)
                    $('#post-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));
                },
                error: (error)=>{console.log(error.responseText);},
            })
        })
    }
    //method to create a post in DOM
    let newPostDom = (post) =>{
        console.log(post);
        return $(`<li id="post-${ post._id}">
        <p>
                        <small>
                                <a class="delete-post-button" href="/posts/destroy/${post._id }">X</a>
                        </small>
                                ${ post.content }
                                        <small>
                                                ${post.user.name}
                                        </small>
        </p>
        <div class="post-comments">
                        <form action="/comments/create" method="POST">
                                <input type="text" name="content" placeholder="Type Here To Add Comment..." required>
                                <input type="hidden" name="post" value="${ post._id}">
                                <input type="submit" value="Add Comment">
                        </form>

                                <div class="pst-comments-list">
                                        <ul id="post-comments-${ post._id}">
                                            
                                        </ul>
                                </div>
        </div>
</li>`)
    }

    //method to delete a post from DOM
    let deletePost = (deleteLink) =>{
        $(deleteLink).click((e)=>{
            e.preventDefault();
            $.ajax({
                type : 'get',
                url: $(deleteLink).prop('href'),
                success : (data) => {
                    $(`#post-${data.data.post_id}`).remove();
                },
                error: (error) => {
                    console.log(error.responseText);
                }
            })
        })
    }

    createPost();
}
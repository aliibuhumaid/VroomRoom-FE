import React, { useEffect } from 'react';
import Post from './Post';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import PostCreate from './PostCreate';
import PostEdit from './PostEdit';
import PostDetail from './PostDetail'
export default function PostList(props) {
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [userType,setUserType] = useState();
    const [currentPost, setCurrentPost] = useState({})
    const [view, setView] = useState();
    const [isView, setIsView] = useState(false);

    useEffect(() =>{
        usertype()
        loadPosts()
        loadCategories()
    }, [])

    const loadPosts = () =>{
        Axios.get("post/index")
        .then(response =>{
            // console.log(response)
            setPosts(response.data.post);
            // console.log(response.data.post)
        })
        .catch(err =>{
            console.log(err);
        })
    }

    const usertype = async () =>{
        if (!props.isAuth) return;
        await Axios.get(`/user/userType?id=${props.userId.id}`)
        .then((res) => {
          console.log(res.data.user);
          setUserType(res.data.user.type);
        })
        .catch((err) => {
          console.log(err);
        });
    
      }
    

    const loadCategories = () =>{
        Axios.get("category/index")
        .then(response =>{
            // console.log(response.data);
            setCategories(response.data);
        })
        .catch(err =>{
            console.log(err);
        })
    }

    const editView = (id) =>{
        Axios.get(`post/edit?id=${id}`)
        .then((res) =>{
            console.log(res.data.post);
            console.log('Loaded Post Information');
            let post = res.data.post;
            setIsEdit(true);
            setCurrentPost(post);
        })
        .catch(err =>{
            console.log("Error loading author information");
            console.log(err);
        })
    }

    const addPost = (post) =>{
        Axios.post("post/add", post)
        .then(res =>{
            console.log("Post Added successfully!!!")
            loadPosts();
        })
        .catch(err =>{
            console.log("Error adding Post")
            console.log(err);
        })
    }

const updatePost = (post) =>{
    Axios.post("post/edit", post)
    .then(res =>{
        console.log("Post Updated successfully!!!")
        loadPosts();
    })
    .catch(err =>{
        console.log("Error updating Post")
        console.log(err);
    })
}

const deletePost = (id) =>{
    Axios.get(`post/delete?id=${id}`)
    .then(res =>{
        console.log("Post Deleted")
        loadPosts();
    })
    .catch(err =>{
        console.log(err);
    })
}

const addWish = (id) =>{
    let body = {
        "post": id,
        "user": props.userId.id
    }
    console.log(body);
    Axios.post(`wishlist/add`, body)
    .then(res =>{
        console.log("withlist added");
    })
    .catch(err =>{
        console.log(err);
    })
}


const viewPost =(id) =>{
    Axios.get(`post/detail?id=${id}`)
    .then(res =>{
        console.log(res);
        setView(res);
        setIsView(true);
        loadPosts();
    })
    .catch(err =>{
        console.log(err);
    })

}

    const allPosts = posts.map((post, index) =>(
        // console.log('working');
        <tr key={index}>
            <Post {...post} admin={userType} editView={editView} deletePost={deletePost} viewPost={viewPost} addWish={addWish}  userId={props.isAuth ? props.userId.id : undefined}></Post>
        </tr>
    ))

    const allCategories = categories.map((cate) => (
        <option key={cate._id} value={cate._id}>
            {cate.name}
        </option>
    ))
    


    
    return (
        <div>
            <div>
            <div className='postHead d-flex justify-content-between align-items-center'>
                <h1>All Posts</h1>
                {props.isAuth && <Link to={`/post/add/${props.userId.id}`} className='btn btn-primary'>Add</Link>}
            </div>
            </div>
            <div class="mx-auto row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
                {allPosts}
            </div>

        </div>
    )
}
            // <PostDetail post={view.data.post}></PostDetail>

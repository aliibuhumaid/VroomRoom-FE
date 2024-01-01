import React from 'react'

export default function PostCreate(props) {
    return (
        <div>
            <h1>PostCreate</h1>
            <div>
                <form>
                    <div>
                        <label>Title:</label>
                        <input type="text" name="title"/>
                    </div>
                    <div>
                        <label>Description:</label>
                        <input type="text" name="description"/>
                    </div>
                    <div>
                        <label>Location:</label>
                        <input type="text" name="location"/>
                    </div>
                    <div>
                        <label>Price:</label>
                        <input type="text" name="price"/>
                    </div>
                    <div>
                        <label>Image:</label>
                        <input type="file" name="image" multiple/>
                    </div>
                    <div>
                        <label>Category:</label>
                        <select name="category">
                            {props.categories}
                        </select>                    
                    </div>
                    <button type="submit">Add</button>
                </form>
            </div>
        </div>

    )
}

import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useEffect, useState } from 'react';
import { API_KEY, API_URL } from '../../api/api';
import { CircularProgress } from '@mui/material';

const Gallery = () => {
    const [picturesArr, setPicturesArr] = useState(null);
    const [count, setcount] = useState(50)


    useEffect(() => {
        const url = API_URL + API_KEY + '&count=' + count;
        fetch(url)
        .then(response => response.json())
        .then(data => setPicturesArr(data.filter(pict => pict.media_type == 'image').map((pict, id) => ({
            img: pict.url,
            title: pict.title,
            author: pict.copyright,
            date: pict.date,
            desc: pict.explanation,
            like: false,
            id,
            cols: 1,
            rows: 1,
        }))))
    }, [count])

    const likeOnClick = (id) => {
        let items = [...picturesArr];
        items[id].like = !items[id].like;
        setPicturesArr(items);
    }

    return (
        <ImageList sx={{ width: '100%', height: '100%' }}>
            <ImageListItem key="Subheader" cols={4}>
                {/* <ListSubheader component="div">December</ListSubheader> */}
            </ImageListItem>
            {picturesArr
            ? picturesArr.map((item) => (
                <ImageListItem key={item.img}>
                <img
                    src={`${item.img}?w=248&fit=crop&auto=format`}
                    srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.title}
                    loading="lazy"
                />
                <ImageListItemBar
                    title={item.title}
                    subtitle={(item.author? `By ${item.author}` : 'By Unknown') + ' | Date: ' + (item.date? item.date : 'N/A')}
                    actionIcon={
                    <IconButton
                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                        aria-label={`info about ${item.title}`}
                        onClick={() => {likeOnClick(item.id)}}
                    >
                        {item.like
                        ? <FavoriteIcon />
                        : <FavoriteBorderIcon />
                        }
                    </IconButton>
                    }
                />
                </ImageListItem>
            ))
            : <CircularProgress />}
        </ImageList>
    )
}


export default Gallery

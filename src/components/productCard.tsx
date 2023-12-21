import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { IoEye, IoHeart, IoCart } from "react-icons/io5";
import AlertDelete from './alertDelete';
interface ProductCardProps {
  imageUrl: string;
  title: string;
  content: string;
  badgeText?: string; // Making the badgeText optional
}

export const ProductCard: React.FC<ProductCardProps> = ({ imageUrl, title, content, badgeText }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isView, setIsView] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [showFavAlert, setShowFavAlert] = useState(false);
  const [showCartAlert, setShowCartAlert] = useState(false);


  const handleAlertClose = (type: string) => {
    if (type === 'fav') {
      setShowFavAlert(false);
    } else if (type === 'cart') {
      setShowCartAlert(false);
    }
  };

  const handleAddClick = () => {
    setIsAdded(!isAdded);
    if (!isAdded) {
      setShowCartAlert(true);

      // setTimeout(() => {
      //   setShowCartAlert(false);
      // }, 3000); // Close cart alert after 3 seconds
    } else {
      setShowCartAlert(false);
    }

  };



  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      setShowFavAlert(true);

    } else {
      setShowFavAlert(false);
    }
  };

  const handleViewClick = () => {
    setIsView(!isView);
  }


  return (
    <Card style={{ position: 'relative', width: '18rem', margin: '10px', height: '25rem', border: '1px solid #F8F9FA' }}>
      {badgeText && (
        <Badge bg="success" style={{ position: 'absolute', top: '0px', right: '0px', fontSize: '15px' }}>
          {badgeText}
        </Badge>
      )}
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{content}</Card.Text>

      </Card.Body>
      <Card.Footer style={{ backgroundColor: '#F8F9FA' }}>
        <span style={{ display: 'inline-block', marginBottom: '10px', marginLeft: '60px' }}>
          <IoHeart
            data-bs-toggle="tooltip" data-bs-placement="top" title="Add to Favourites"
            size={25}
            style={{ marginRight: '15px', color: isLiked ? '#F45050' : 'inherit', cursor: 'pointer' }}
            onClick={handleLikeClick}
          />
          <IoEye
            data-bs-toggle="tooltip" data-bs-placement="top" title="Quick View"
            size={25}
            style={{ marginRight: '15px', color: isView ? '#38419D' : 'inherit', cursor: 'pointer' }}
            onClick={handleViewClick}
          />
          <IoCart
            data-bs-toggle="tooltip" data-bs-placement="top" title="Add to Cart"
            size={25}
            style={{ color: isAdded ? '#65B741' : 'inherit', cursor: 'pointer' }}
            onClick={handleAddClick}
          />
        </span>
      </Card.Footer>
      {/* ... (other card content) ... */}
      {showFavAlert ? (
        <AlertDelete title="Added to favourites" open={showFavAlert} handleClose={() => handleAlertClose('fav')} />
      ) : (
        showCartAlert && (
          <AlertDelete title="Added to your cart" open={showCartAlert} handleClose={() => handleAlertClose('cart')} />
        )
      )}

    </Card>
  );
};

import React from 'react';
import {View} from 'react-native';
import CartCard from '../component/CartCard';

const Cart = () => {
  return (
    <View>
      <CartCard
        titre="50 crédits pour 50€"
        contenu="Acheter 50 crédits Uguest afin de mener des campagnes en partenariat avec des influenceurs (corresponds à 2 campagnes max)"
      />
      <CartCard
        titre="110 crédits pour 100€ (10 % de remise)"
        contenu="Acheter 110 crédits Uguest afin de mener des campagnes en partenariat avec des influenceurs (corresponds à 5 campagnes max)"
      />
      <CartCard
        titre="240 crédits pour 200€ (20% de remise)"
        contenu="Acheter 240 crédits Uguest afin de mener des campagnes en partenariat avec des influenceurs (corresponds à 11 campagnes max)"
      />
    </View>
  );
};

export default Cart;

import React from 'react';
import {Dimensions, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

export default function ShimmerNoteList() {
  return (
    <>
      <ShimmerNoteItem />
      <ShimmerNoteItem />
      <ShimmerNoteItem />
      <ShimmerNoteItem />
      <ShimmerNoteItem />
      <ShimmerNoteItem />
      <ShimmerNoteItem />
      <ShimmerNoteItem />
      <ShimmerNoteItem />
    </>
  );
}

function ShimmerNoteItem({visible, children}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
        width: Dimensions.get('screen').width,
      }}>
      <ShimmerPlaceHolder
        width={50}
        height={50}
        shimmerStyle={{borderRadius: 25}}
      />
      <View style={{marginLeft: 10}}>
        <ShimmerPlaceHolder
          width={150}
          height={16}
          style={{marginBottom: 5}}
          shimmerStyle={{borderRadius: 8}}
          visible={visible}
          children={children}
        />
        <ShimmerPlaceHolder
          width={100}
          height={16}
          shimmerStyle={{borderRadius: 8}}
          visible={visible}
          children={children}
        />
      </View>
    </View>
  );
}

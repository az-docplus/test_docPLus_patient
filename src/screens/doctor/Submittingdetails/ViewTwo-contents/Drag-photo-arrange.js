import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import SortableGrid from 'react-native-sortable-grid';
import { Host } from '../../../../utils/connection';

export default class basicExample extends Component {
  render() {
    return (
      <View style={{ paddingHorizontal: 16, flex: 1 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <SortableGrid
            style={styles.container}
            blockTransitionDuration={200}
            activeBlockCenteringDuration={100}
            itemsPerRow={2}
            dragActivationTreshold={100}
            onDragRelease={({ itemOrder }) => {
              console.log(
                'Drag was released, the blocks are in the following order: ',
                itemOrder,
              );
              const photos = itemOrder.map((el) => this.props.photos[el.key]);
              this.props.setPhotos(photos);
              this.props.ReArrangePhoto(photos);
            }}
            onDragStart={() => console.log('Some block is being dragged now!')}>
            {this.props.photos.map((data, index) => (
              <View key={index} style={[styles.block]}>
                <Image
                  source={{
                    uri: `${Host}${data.toString()
                      .replace('public', '')
                      .replace('\\\\', '/')}`,
                  }}
                  style={styles.image}
                />
              </View>
            ))}
          </SortableGrid>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  block: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 160,
    width: 160,
    borderRadius: 12,
  },
  container: {
    display: 'flex',
    marginTop: 24,
  },
});

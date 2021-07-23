import React from 'react';
import { Button, Column, Row, Tile } from 'carbon-components-react';
import styles from './ohri-summary-tile.scss';

function OHRISummaryTileTablet({ details }) {
  return (
    <Tile className={styles.tabletTile}>
      <Row className={styles.tabletTileTitle}>Programme summary</Row>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        {details.map((name, index) => {
          return (
            <div>
              <div className={styles.tabletTileSubTitle}>{name.subTitle}</div>
              <div className={styles.tabletTileValue}>{name.value}</div>
            </div>
          );
        })}
      </div>
    </Tile>
  );
}

export default OHRISummaryTileTablet;
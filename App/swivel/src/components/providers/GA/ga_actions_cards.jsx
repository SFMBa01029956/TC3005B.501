import CustomIconCard from '@/components/general/custom_icon_card';
import styles from '@/styles/cards.module.css';

export default function GActionsCards() {
  return (
    <div className={styles.actionCardsContainer}>
      <CustomIconCard
        imageSource="/manager/catalog_action.jpg"
        icon="/manager/catalog_icon.svg"
        text="Administración del catálogo"
        href="/providers/new_GA/" //<-- there are still no route to add
        light={false}
        header=''
        fiftyFifty={false}
      />
      <CustomIconCard
        imageSource="/manager/seller_action.jpg"
        icon="/manager/seller_icon.svg"
        text="Administración de gerentes"
        href="/providers/new_GA/" //<-- there are still no route to add
        light={false}
        header=''
        fiftyFifty={false}
      />
      <CustomIconCard
        imageSource="/manager/branch_action.jpg"
        icon="/manager/branch_icon.svg"
        text="Administración de agencias"
        href="/providers/new_GA/" //<-- there are still no route to add
        light={false}
        header=''
        fiftyFifty={false}
      />
      <CustomIconCard
        imageSource="/manager/statistics_action.png"
        icon="/manager/statistics_icon.svg"
        text="Estadísticas de ventas"
        href="/providers/new_GA/" //<-- there are still no route to add
        light={false}
        header=''
        fiftyFifty={false}
      />
    </div>
  );
}
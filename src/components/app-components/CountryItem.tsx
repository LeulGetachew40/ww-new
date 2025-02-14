import styles from "./CountryItem.module.css";
import CountryItemInterface from "../../utils/countryInterface";
interface CountryItemProps {
  country: CountryItemInterface;
}
function CountryItem({ country }: CountryItemProps) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;

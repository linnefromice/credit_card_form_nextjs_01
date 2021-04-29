import { FC, useState } from "react";
import { useForm } from "react-hook-form";

import styles from "./Register.module.scss";
import View from "./View";

const years = [...Array(20).keys()].map((i) => (i += 2020).toString());
const months = [...Array(12).keys()].map((i) => (i += 1).toString());

interface IFormRegister {
  cardNumber: string;
  holderName: string;
  expirationYear: string;
  expirationMonth: string;
  cvv: string;
}
const Register: FC = () => {
  const {
    register,
    watch,
    setValue,
  } = useForm<IFormRegister>({
    mode: 'onSubmit',
    defaultValues: {
      cardNumber: "",
      holderName: "",
      expirationYear: "YEAR",
      expirationMonth: "MONTH",
      cvv: ""
    },
  });

  const watchCardNumber = watch('cardNumber');
  const watchHolderName = watch('holderName');
  const watchExpirationYear = watch('expirationYear');
  const watchExpirationMonth = watch('expirationMonth');
  const watchCvv = watch('cvv');

  const [focusCardNumber, setFocusCardNumber] = useState<boolean>(false);
  const [focusHolderName, setFocusHolderName] = useState<boolean>(false);
  const [focusYear, setFocusYear] = useState<boolean>(false);
  const [focusMonth, setFocusMonth] = useState<boolean>(false);
  const [focusCvv, setFocusCvv] = useState<boolean>(false);

  const processDisplayedCardNumber = (value: string): string => {
    return Array.from(value)
      .map((element, index) => {
        return index % 4 == 3 ? element + " " : element;
      })
      .join("")
      .substring(0, 19);
  };
  const saveCardNumber = (value: string) => {
    let number =
      value.length <= 19
        ? value.replace(/\s+/g, "")
        : value.substring(0, 19).replace(/\s+/g, "");
    number == watchCardNumber && value.length != 20
      ? setValue('cardNumber' ,number.slice(0, -1))
      : setValue('cardNumber', number);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__cardArea}>
        <View
          cardNumber={watchCardNumber}
          holderName={watchHolderName}
          year={watchExpirationYear}
          month={watchExpirationMonth}
          cvv={watchCvv}
          focusCardNumber={focusCardNumber}
          focusHolderName={focusHolderName}
          focusYear={focusYear}
          focusMonth={focusMonth}
          focusCvv={focusCvv}
        />
      </div>
      <div className={styles.wrapper__formArea}>
        <div className={styles.card_form}>
          <div className={styles.card_form__inner}>
            <div className={styles.card_form__row}>
              <div
                className={`${styles.card_form__group} ${styles.card_input}`}
              >
                <label className={styles.card_input__label}>Card Number</label>
                <input
                  className={styles.card_input__input}
                  type="text"
                  {...register("cardNumber")}
                  value={processDisplayedCardNumber(watch('cardNumber'))}
                  onChange={(e) => saveCardNumber(e.target.value)}
                  onFocus={() => setFocusCardNumber(true)}
                  onBlur={() => setFocusCardNumber(false)}
                />
              </div>
            </div>
            <div className={styles.card_form__row}>
              <div
                className={`${styles.card_form__group} ${styles.card_input}`}
              >
                <label className={styles.card_input__label}>Card Name</label>
                <input
                  className={styles.card_input__input}
                  type="text"
                  {...register("holderName")}
                  onFocus={() => setFocusHolderName(true)}
                  onBlur={() => setFocusHolderName(false)}
                />
              </div>
            </div>
            <div className={styles.card_form__row}>
              <div className={styles.card_form__group_half}>
                <label className={styles.card_input__label}>
                  Expiration Date
                </label>
                <div className={styles.card_expiration_area}>
                  <select
                    className={styles.card_expiration_area__select}
                    {...register("expirationYear")}
                    onFocus={() => setFocusYear(true)}
                    onBlur={() => setFocusYear(false)}
                  >
                    <option value="YEAR">YEAR</option>
                    {years.map((value) => {
                      return <option value={value}>{value}</option>;
                    })}
                  </select>
                  <select
                    className={styles.card_expiration_area__select}
                    {...register("expirationMonth")}
                    onFocus={() => setFocusMonth(true)}
                    onBlur={() => setFocusMonth(false)}
                  >
                    <option value="MONTH">MONTH</option>
                    {months.map((value) => {
                      return <option value={value}>{value}</option>;
                    })}
                  </select>
                </div>
              </div>
              <div className={styles.card_form__group_half}>
                <div className={styles.card_input}>
                  <label className={styles.card_input__label}>CVV</label>
                  <input
                    className={styles.card_input__input}
                    type="text"
                    {...register("cvv")}
                    onFocus={() => setFocusCvv(true)}
                    onBlur={() => setFocusCvv(false)}
                  />
                </div>
              </div>
            </div>
            <div
              className={`${styles.card_form__row} ${styles.card_submit_area}`}
            >
              <button
                type="submit"
                className={styles.card_submit_area__button}
              >
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

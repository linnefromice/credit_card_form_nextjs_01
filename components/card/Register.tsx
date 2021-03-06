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
    handleSubmit,
    setValue,
    formState: { errors }
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

  const onSubmit = (data: IFormRegister) => console.log(data);

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
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.card_form__inner}>
            <div className={styles.card_form__row}>
              <div
                className={`${styles.card_form__group} ${styles.card_input}`}
              >
                <label className={styles.card_input__label}>Card Number</label>
                <input
                  className={styles.card_input__input}
                  type="text"
                  {...register("cardNumber", {
                    required: "This field is required",
                    minLength: {
                      value: 16,
                      message: "Please enter in 16 digits numbers"
                    },
                    maxLength: {
                      value: 16,
                      message: "Please enter in 16 digits numbers"
                    },
                    pattern: {
                      value: /[0-9]{16}/,
                      message: "Please use only number type"
                    }
                  })}
                  value={processDisplayedCardNumber(watch('cardNumber'))}
                  onChange={(e) => saveCardNumber(e.target.value)}
                  onFocus={() => setFocusCardNumber(true)}
                  onBlur={() => setFocusCardNumber(false)}
                />
                {errors.cardNumber && <span className={styles.error}>{errors.cardNumber.message}</span>}
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
                  {...register("holderName", {
                    required: "This field is required",
                  })}
                  onFocus={() => setFocusHolderName(true)}
                  onBlur={() => setFocusHolderName(false)}
                />
                {errors.holderName && <span className={styles.error}>{errors.holderName.message}</span>}
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
                    {...register("expirationYear", {
                      required: "This field is required",
                    })}
                    onFocus={() => setFocusYear(true)}
                    onBlur={() => setFocusYear(false)}
                  >
                    <option value="YEAR">YEAR</option>
                    {years.map((value) => {
                      return <option value={value}>{value}</option>;
                    })}
                  </select>
                  {errors.expirationYear && <span className={styles.error}>{errors.expirationYear.message}</span>}
                  <select
                    className={styles.card_expiration_area__select}
                    {...register("expirationMonth", {
                      required: "This field is required",
                    })}
                    onFocus={() => setFocusMonth(true)}
                    onBlur={() => setFocusMonth(false)}
                  >
                    <option value="MONTH">MONTH</option>
                    {months.map((value) => {
                      return <option value={value}>{value}</option>;
                    })}
                  </select>
                  {errors.expirationMonth && <span className={styles.error}>{errors.expirationMonth.message}</span>}
                </div>
              </div>
              <div className={styles.card_form__group_half}>
                <div className={styles.card_input}>
                  <label className={styles.card_input__label}>CVV</label>
                  <input
                    className={styles.card_input__input}
                    type="text"
                    {...register("cvv", {
                      required: "This field is required",
                      minLength: {
                        value: 3,
                        message: "Please enter in 3 digits numbers"
                      },
                      maxLength: {
                        value: 3,
                        message: "Please enter in 3 digits numbers"
                      },
                    })}
                    onFocus={() => setFocusCvv(true)}
                    onBlur={() => setFocusCvv(false)}
                  />
                </div>
                {errors.cvv && <span className={styles.error}>{errors.cvv.message}</span>}
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

import homeImage from '../../assets/images/beting.avif';
import homeImage1 from '../../assets/images/earning-money.png';
import homeImage2 from '../../assets/images/financial-managment.webp'
import homeImage3 from '../../assets/images/payment.avif'
import homeImage4 from '../../assets/images/idea.png'

const sections = [
    {
      heading: "🏆 Grandes Oportunidades!",
      rightImg: homeImage2,
      subHeading: "Encuentra las mejores oportunidades de apuestas, con los últimos partidos.",
      btnText: "🔎 Explorar Partidos disponibles",
      reference: "/fixtures",
      imgWidth: "90%",
    },
    {
      heading: "💸 Pagos inmediatos!",
      rightImg: homeImage1,
      subHeading: "Recibe los pagos de tus apuestas acertadas directo en tu billetera digital y usa ese dinero para futuras apuestas.",
      btnText: "💰 Ir a mi billetera",
      reference: "/wallet",
      imgWidth: "58%",
    },
    {
        heading: "📈 Resultados en linea!",
        rightImg: homeImage3,
        subHeading: "Revisa el estado de tus apuestas, tus solicitudes de compra y accede a tus boletas en linea.",
        btnText: "🧾 Ir a mis apuestas",
        reference: "/buy-requests",
        imgWidth: "60%",
      },
    {
        heading: "🤖 Sugerencias de partidos!",
        rightImg: homeImage4,
        subHeading: "Recibe sugerencias de los partidos que más te conveniene apostar, basados en tus preferencias, estadísticas y resultados.",
        btnText: "🤝 Ir a recomendaciones",
        reference: "/recomedaciones",
        imgWidth: "80%",
      },
  ];

export default sections;

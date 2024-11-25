import Swal from 'sweetalert2';

const HandleAdminBuy = async (opcion, numBonds, bono, fixtureId, betType) => {
  const bond = bono.bonosDisponibles;
    if (numBonds <= bond) {
      try {
        if (opcion === 'wallet') {
          const isAvailable = await postCheckAmountAvailable(accessToken, numBonds * bono.precio);
          if (!isAvailable) {
            noFundsAlert();
            return;
          } else {
            const wallet = true;
            const data = await postBuyBonds(accessToken, fixtureId, numBonds, numBonds * bono.precio, betType, wallet);
            const request = data.data.buyRequest;
            const token_ws = "";
            createBrokerRequest(accessToken, {token_ws, request, fixtureId, numBonds, betType, wallet});
            await postDiscountAmount(accessToken, numBonds * 1000);
            const webpay = false;
            const buyRequestId = request.uuid;
            const response = await commitTransaction({ accessToken, token_ws, webpay, buyRequestId });
            successAlert();
          }
        }

        // Crear solicitud de compra
        // La respuesta es el trx y la solicitud de compra
        if (opcion === 'webpay') {
          const wallet = false;
          const data = await postBuyBonds(accessToken, fixtureId, numBonds, numBonds * bono.precio, betType, wallet);
          const trx = data.data.transaction;
          const request = data.data.buyRequest;

          const { token: token_ws, url } = trx;
          createBrokerRequest(accessToken, {token_ws, request, fixtureId, numBonds, betType, wallet});

          // Crear un formulario dinámico
          const form = document.createElement('form');
          form.method = 'POST';
          form.action = url;

          // Crear un campo de entrada para el token
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = 'token_ws';
          input.value = token_ws;
          form.appendChild(input);

          // Agregar el formulario al cuerpo del documento y enviarlo
          document.body.appendChild(form);
          form.submit();
        }

        // successAlert();
        } catch (error) {
          console.error('Error al realizar la compra:', error);
          Swal.fire({
            title: 'Error',
            text: 'Ocurrió un error al realizar la compra',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      } else {
        Swal.fire({
          title: 'Error',
          text: 'No hay suficientes bonos disponibles',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
  };


// Exportamos
export default HandleAdminBuy;
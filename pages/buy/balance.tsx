import React from 'react';
import { useRouter } from 'next/router';
import Layout from 'components/Layout';
import Header from 'components/HeaderUser';
import Heading from 'components/Heading';
import supabase from 'utils/supabase';
import { Text, Button, Stack, NumberInput, Select } from '@mantine/core';
import styled from '@emotion/styled';
import colors from 'utils/colors';
import { useForm } from '@mantine/form';
import { FileInput } from '@mantine/core';
import Loader from 'components/Loader';
import pdxtobs from 'utils/pdxTObs';

const ColoredText = styled.span`
  color: ${colors.green};
`;
const StyledContainer = styled.div`
  border: 1px solid #000;
  margin: auto;
  width: 500px;
  margin-top: 20px;
  padding: 10px;
  border-radius: 6px;
`;
const StyledList = styled.ul`
  margin: auto;
  width: 500px;
  margin-top: 20px;
  padding: 10px;
  border-radius: 6px;
  list-style: none;
`;

type Props = {};

function Balance({}: Props) {
  const router = useRouter();
  const [balance, setBalance] = React.useState<any>(null);
  const [isLoading, setLoading] = React.useState<any>(true);
  const [user, setUser] = React.useState<any>(null);
  const [banks, setBanks] = React.useState<any>([]);
  const [valueBank, setValueBank] = React.useState<string | null>(null);
  const pdxInput = React.useRef<any>(null);

  React.useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      const { data, error } = await supabase.auth.getUser();
      error && router.push('/login');
      setUser(data);
    };
    const getBanks = async () => {
      let { data: banksData, error } = await supabase
        .from('banks')
        .select('id,name,account_number')
        .eq('active', true);

      setBanks(banksData);
      setLoading(false);
    };
    getUser();
    getBanks();
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      let number;
      if (pdxInput?.current) {
        number = Number(pdxInput.current.value.split(' ')[1]);
      } else {
        number = 0;
      }
      setBalance(number * pdxtobs);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const form = useForm({
    initialValues: {
      payment_file: null,
      amount: '$ 0.0',
      bank: null,
    },

    validate: {
      payment_file: (value) => (value ? null : 'Selecciona una imagen'),
      amount: (value) =>
        Number(value) > 0 ? null : 'El pago debe ser mayor a 0',
      bank: (value) => (value ? null : 'Selecciona un banco'),
    },
  });

  return (
    <Layout Header={<Header />}>
      <Loader show={isLoading} />
      <Heading order={1} styles={{ textAlign: 'center' }}>
        Comprar saldo
      </Heading>
      <Text align="center" weight="bold" color="dark" size={18} mt={35}>
        ¿Cuanto saldo quieres comprar?, elige la cantidad y envia la imagen de
        la transferencia, el saldo se reflejara en el transcurso de 24 horas.
        <br />
        Si el saldo no se ha reflejado en el transcurso de 72 horas
        probablemente se haya rechazado.
      </Text>
      <Heading
        order={2}
        size="h3"
        styles={{ textAlign: 'center', marginTop: '30px' }}
      >
        Cuentas
      </Heading>
      <StyledList>
        {banks?.map((bank: any) => {
          return (
            <li
              key={bank.id}
              style={{
                listStyle: 'none',
                textAlign: 'center',
                marginBottom: '10px',
              }}
            >
              <Text size={18}>
                <ColoredText>{bank.name}</ColoredText>: {bank.account_number}
              </Text>
            </li>
          );
        })}
      </StyledList>
      <StyledContainer>
        <form
          onSubmit={form.onSubmit(async ({ payment_file, bank }: any) => {
            const fileName = `${payment_file.name}`
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '');
            const resultImage = await supabase.storage
              .from('payments')
              .upload(fileName, payment_file, { upsert: true });
            if (resultImage.error) {
              alert(resultImage.error.message);
              throw resultImage.error.message;
            } else {
              const urlPayment = supabase.storage
                .from('payments')
                .getPublicUrl(resultImage.data.path);

              const { data, error } = await supabase.from('payments').insert([
                {
                  clients_email: user.user.email,
                  banks_id: bank,
                  amount: balance,
                  voucher_url: urlPayment.data.publicUrl,
                },
              ]);

              if (!error) {
                router.push('/payment-validate');
              }
            }
          })}
        >
          <Stack>
            <NumberInput
              label="Saldo (PDX) a comprar"
              withAsterisk
              precision={2}
              min={0}
              defaultValue={0}
              ref={pdxInput}
              parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
              {...form.getInputProps('amount')}
              formatter={(value: any) =>
                !Number.isNaN(parseFloat(value))
                  ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  : '$ '
              }
            />
            <NumberInput
              label="Cantidad a pagar en bolivares"
              readOnly
              variant="filled"
              hideControls
              precision={2}
              min={0}
              defaultValue={0}
              value={balance}
              parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
              formatter={(value: any) =>
                !Number.isNaN(parseFloat(value))
                  ? `Bs. ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  : 'Bs. '
              }
            />
            {banks && (
              <Select
                label="Banco"
                withAsterisk
                placeholder="Provincial"
                data={banks?.map((bank: any) => {
                  return {
                    value: bank.id,
                    label: `${bank.name}: ${bank.account_number}`,
                  };
                })}
                value={valueBank}
                onChange={setValueBank}
                {...form.getInputProps('bank')}
                required
              />
            )}
            <FileInput
              label="Transferencia"
              placeholder="Selecciona una imagen"
              title="Imagen de la transferencia"
              {...form.getInputProps('payment_file')}
              withAsterisk
              required
            />
            <Button
              type="submit"
              fullWidth
              style={{ backgroundColor: '#FCB84C' }}
            >
              Comprar
            </Button>
          </Stack>
        </form>
      </StyledContainer>
    </Layout>
  );
}

export default Balance;

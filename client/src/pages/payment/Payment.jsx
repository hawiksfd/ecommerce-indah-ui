import React from 'react'
import Navbar from './../../components/navbar/Navbar';
import './payment.css'

const Payment = () => {
  return (
    <div>
      <Navbar/>
    <div className="pay">
      <div className="containerPay">
        <div className="contentPay">
          <div className="totalPay">Total Pembayaran</div>
          <div className="deadlinePay">Bayar Dalam</div>
          <div className="bankInfo">
            <div className="bankPay">BCA</div>
            <div className="numbBank">No. Rekening : 3242836325</div>
          </div>
          <div className="intructionPay">
            <p>
              1. Pilih Transaksi Lainnya > Transfer > Ke Rek BCA Virtual Account.
            </p>
            <p>
              2. Masukkan nomor Virtual Account 126 081383527396 dan pilih Benar.
            </p>
            <p>
              3. Periksa informasi yang tertera di layar. Pastikan Merchant adalah Shopee, 
              Total tagihan sudah benar dan username kamu indahberas. Jika benar pilih Ya.
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Payment

import React, { useState } from 'react'
import { PhoneIcon, MapPinIcon, EnvelopeIcon } from '@heroicons/react/24/solid'
import { useMoralis } from 'react-moralis'

type Props = {}

const ContactForm = (props: Props) => {
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const { user } = useMoralis()

  const submitForm = () => {
    window.open(
      `mailto:defibulls@gmail.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(name)}}): ${encodeURIComponent(
        `${message} \n \n Wallet Address - ${user?.get('ethAddress')}`
      )}`
    )
  }

  return (
    <div
      id="contact"
      className="flex h-screen w-full snap-center flex-col items-center justify-around gap-4 bg-black p-[10%] md:max-h-[100vh] md:px-[10%]"
    >
      <div className="relative flex h-full w-full items-start">
        <p className="font-marker text-3xl font-black uppercase">
          contact form
          <hr aria-orientation="horizontal" className="my-5" />
          <img
            src="/images/transparentBg/88bgt.png"
            alt=""
            className="absolute right-[320px] top-[-122px] hidden w-[200px] object-contain lg:block"
          />
        </p>
      </div>
      <form
        className="flex w-full flex-col  justify-center"
        onSubmit={submitForm}
      >
        <fieldset>
          <div>
            <input
              className=""
              type="text"
              placeholder="Name*"
              value={name}
              id="contactName"
              name="contactName"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Email*"
              value={email}
              id="contactEmail"
              name="contactEmail"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              name="contactSubject"
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div>
            <textarea
              value={message}
              placeholder="Message*"
              onChange={(e) => setMessage(e.target.value)}
              id="contactMessage"
              name="contactMessage"
            ></textarea>
          </div>

          <div>
            <button
              disabled={!message && !email && !name}
              onClick={submitForm}
              type="submit"
              className="rounded-md bg-[#8E05C2] px-3 py-2"
            >
              Submit
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  )
}

export default ContactForm

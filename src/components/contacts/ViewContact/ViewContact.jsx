/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ContactService } from '../../../services/ContactService'
import Spinner from '../../Spinner/Spinner'

let ViewContact = () => {
  let { contactId } = useParams()

  let [state, setState] = useState({
    loading: false,
    contact: {},
    errorMessage: '',
    group: {},
  })

  useEffect(() => {
    async function fetchData() {
      try {
        setState({ ...state, loading: true })
        let response = await ContactService.getContact(contactId)
        let groupResponse = await ContactService.getGroup(response.data)
        setState({
          ...state,
          loading: false,
          contact: response.data,
          group: groupResponse.data,
        })
      } catch (error) {
        setState({
          ...state,
          loading: false,
          errorMessage: error.message,
        })
      }
    }
    fetchData()
  }, [contactId])

  let { loading, contact, errorMessage, group } = state
  return (
    <React.Fragment>
      <section className="view-contact-intro p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-warning">View Contact</p>
              <p className="fst-italic">
                Below is information on the site selected. Push back to return
                to main page.
              </p>
            </div>
          </div>
        </div>
      </section>
      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          {Object.keys(contact).length > 0 && Object.values(group).length > 0 && (
            <section className="view-contact mt-3">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-md-4">
                    <img src={contact.photo} alt="" className="contact-img" />
                  </div>
                  <div className="col-md-8">
                    <ul className="list-group">
                      <li className="list-group-item list-group-item-action">
                        Site : <span className="fw-bold">{contact.site}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Manager :{' '}
                        <span className="fw-bold">{contact.site_manager}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Contact :{' '}
                        <span className="fw-bold">{contact.phone}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Email : <span className="fw-bold">{contact.email}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Category : <span className="fw-bold">{group.name}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Vendor :{' '}
                        <span className="fw-bold">{contact.vendor}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Vendor Email :{' '}
                        <span className="fw-bold">{contact.vendor_email}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Vendor Phone :{' '}
                        <span className="fw-bold">{contact.vendor_phone}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="row">
                  <div className="col mt-4 p-4">
                    <Link to={'/contacts/list'} className="btn btn-warning">
                      Back
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  )
}
export default ViewContact

import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../state/auth/AuthContext';
import BaseLayout from '../../layouts/BaseLayout';
import Field from '../../components/Field/Field';
import FileInputMultiple from '../../components/FileInputMultiple/FileInputMultiple';
import Button from '../../components/Button/Button';
import { useForm } from 'react-hook-form';
import addJob from '../../api/job/addJob';
import statusOptions from '../../config/statusOptions';
import * as moment from 'moment';

const JobAddView = () => {
  const { register, handleSubmit, setError, errors } = useForm();
  const { authContext } = useContext(AuthContext);
  const history = useHistory();

  const onFormSubmit = async (data: any) => {
    if (data.files.length > 4) {
      setError("files", {
        type: "manual",
        message: "Too many files selected!"
      });

      return;
    }

    let formData = new FormData();

    for (let [key, value] of Object.entries(data)) {
      if (key === "dateApplied") {
        formData.append(key, moment(value).valueOf());
      } else {
        formData.append(key, value);
      }
    }

    formData.delete('files');
    for (let [key, value] of Object.entries(data.files)) {
      formData.append('files', value);
    }

    await addJob(formData, authContext.token);
    history.push('/job/list');
  }

  return (
    <BaseLayout>
      <form className="md:grid md:grid-cols-2 md:gap-x-6" onSubmit={handleSubmit(onFormSubmit)}>
        <Field register={register({ required: "Missing position title" })}
          error={errors.positionTitle} name="positionTitle"
          label="Position title:" type="text" maxLength="50" />
        <Field register={register({ required: "Missing location" })}
          error={errors.location} name="location"
          label="Location:" type="text" maxLength="50" />
        <Field register={register({ required: "Missing company name" })}
          error={errors.company} name="company"
          label="Company:" type="text" maxLength="50" />
        <Field register={register({ required: "Missing link" })}
          error={errors.linkToPosting} name="linkToPosting"
          label="Link to job ad:" type="url" maxLength="250" />
        <Field register={register({ required: "Missing application date" })}
          error={errors.dateApplied} name="dateApplied"
          label="Application date:" type="date" />
        <div>
          Current status:
            <select className="px-4 py-2.5 my-2 bg-gray-200 w-full rounded-xl" ref={register} name="currentStatus">
            {statusOptions.map((option, index) => (
              <option key={index} value={index}>{option}</option>
            ))}
          </select>
        </div>
        <div>
          <FileInputMultiple register={register} name="files" />
          {errors.files && errors.files.message}
        </div>
        <div />
        <div>
          Notes:
          <textarea className="px-4 py-2.5 my-2 bg-gray-200 w-full rounded-xl" ref={register} name="notes" maxLength="5000" />
        </div>
        <div />
        <Button color="green" fillBlock type="submit">Add job</Button>
      </form>
    </BaseLayout>
  );
};

export default JobAddView;

import { Request, Response } from 'express';
import OrganizationReport from '../models/OrganizationReport';


function countGender(data) {
  let data_male = data.filter(data => data.gender === 'male');
  data_male = data_male.length;

  let data_female = data.filter(data => data.gender === 'female');
  data_female = data_female.length;

  const gender = {
    male: data_male,
    female: data_female
  }

  return gender;
}

function countSize(data) {
  let data_small = data.filter(data => data.size === 'small');
  data_small = data_small.length;

  let data_medium = data.filter(data => data.size === 'medium');
  data_medium = data_medium.length;

  let data_big = data.filter(data => data.size === 'big');
  data_big = data_big.length;

  const size = {
    small: data_small,
    medium: data_medium,
    big: data_big
  }

  return size;
}

function countStatus(data) {
  let data_rejected = data.filter(data => data.status === 'rejected');
  data_rejected = data_rejected.length;
  let data_accepted = data.filter(data => data.status === 'accept');
  data_accepted = data_accepted.length;
  let data_new = data.filter(data => data.status === 'new');
  data_new = data_new.length;

  const status = {
    rejected: data_rejected,
    accept: data_accepted,
    new: data_new
  }

  return status;
}

class OrganizationReportController {

  async show(req: Request, res: Response) {
    const report = new OrganizationReport();
    const organization_id: number = req.query.organization_id;

    const dogGenderAndSize = await report.getGenderAndSize('dog', organization_id);
    const catGenderAndSize = await report.getGenderAndSize('cat', organization_id);
    const dogApplicationStatus = await report.getApplicationStatus('dog', organization_id);
    const catApplicationStatus = await report.getApplicationStatus('cat', organization_id);

    const dogGenderResult = countGender(dogGenderAndSize);
    const catGenderResult = countGender(catGenderAndSize);

    const dogSizeResult = countSize(dogGenderAndSize);
    const catSizeResult = countSize(catGenderAndSize);

    const dogApplicationStatusResult = countStatus(dogApplicationStatus);
    const catApplicationStatusResult = countStatus(catApplicationStatus);

    const data = {
      dog: {
        gender: dogGenderResult,
        size: dogSizeResult,
        status: dogApplicationStatusResult
      },
      cat: {
        gender: catGenderResult,
        size: catSizeResult,
        status: catApplicationStatusResult
      }
    }

    res.json(data);

  }
}

export = OrganizationReportController;

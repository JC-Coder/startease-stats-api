import AppError from '../../common/utils/appError.js';
import { AppResponse } from '../../common/utils/appResponse.js';
import { catchAsync } from '../../common/utils/errorHandler.js';
import { StatModel } from '../schemas/stat.schema.js';
import { STAT_CONSTANTS } from '../../common/constants/stat.constant.js';

export const getStats = catchAsync(async (req, res) => {
  const stat = await StatModel.findOne({
    app: STAT_CONSTANTS.app
  });

  if (!stat) {
    throw new AppError('Stat not available', 404);
  }

  return AppResponse(
    res,
    200,
    {
      ...stat.toJSON()
    },
    'Stat retrieved successfully'
  );
});

export const addStat = catchAsync(async (req, res) => {
  let { app, framework } = req.body;

  console.log('new request', { app, framework });

  if (!app || !framework) {
    throw new AppError('Invalid Input', 400);
  }

  app = app.trim();
  framework = framework.trim();

  let appStat = await StatModel.findOne({
    app
  });

  if (!appStat) {
    appStat = await StatModel.create({
      app,
      totalProjectGenerated: 1,
      projectGeneratedStat: [
        {
          framework,
          genCount: 1
        }
      ]
    });
  } else {
    appStat.totalProjectGenerated += 1;

    const frameworkExistIndex = appStat.projectGeneratedStat.findIndex(
      (stat) => stat.framework === framework
    );

    if (frameworkExistIndex > -1) {
      appStat.projectGeneratedStat[frameworkExistIndex].genCount += 1;
    } else {
      appStat.projectGeneratedStat.push({
        framework,
        genCount: 1
      });
    }

    await appStat.save();
  }

  return AppResponse(res, 201, appStat, 'Record updated successfully');
});

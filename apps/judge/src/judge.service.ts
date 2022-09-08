import { Injectable } from '@nestjs/common';
import fs from 'fs';
import util from 'util';
import child_process from 'child_process';
import { plainToClass, plainToInstance } from 'class-transformer';

enum JudgeType {
  NORMAL = 'normal',
  SPECIAL = 'special',
  INTERACTIVE = 'interactive',
}

interface JudgeOption {
  type?: JudgeType;

  execPath?: fs.PathLike;
  execArgs?: string[];

  inputPath?: fs.PathLike;
  outputPath?: fs.PathLike;

  validatorPath?: fs.PathLike;
  validatorArgs?: string[];

  cpuLimit?: number;
  realLimit?: number;
  memLimit?: number;
}

enum JudgeResult {
  CORRECT = 'correct',
  WRONG = 'wrong',
  CPU_TIME_LIMIT = 'cpu_time_limit',
  SEGMENTATION_FAULT = 'segmentation_fault',
  RUNTIME_ERROR = 'runtime_error',
  BAD_SYSTEM_CALL = 'bad_system_call',
  PRESENTATION_ERROR = 'presentation_error',
  PRESENTATION_EXCEED = 'presentation_exceed',
}

class JudgeInfo {
  cputime: number;
  realtime: number;
  memory: number;

  exitcode: number;

  signal: number;
  signal_msg: string;

  judgeresult: number;
  judgeresult_msg: string;
}

@Injectable()
export class JudgeService {
  constructor() {}

  // TODO:
  async compile(srcPath: fs.PathLike, dstPath: fs.PathLike) {
    // TODO:
    const cmd = `g++ -o ${dstPath} ${srcPath} -static -O2 -Wall`;
    await util.promisify(child_process.exec)(cmd, { encoding: 'utf-8' });
  }

  async judge(option: JudgeOption): Promise<JudgeInfo> {
    const cmdList = ['lavidajudger-cli'];

    if (option.execPath) cmdList.push(`--exec-path ${option.execPath}`);
    if (option.execArgs) cmdList.push(); // TODO:
    if (option.inputPath) cmdList.push(`--input-path ${option.inputPath}`);
    if (option.outputPath) cmdList.push(`--output-path ${option.outputPath}`);
    if (option.validatorPath)
      cmdList.push(`--validator-path ${option.validatorPath}`);
    if (option.validatorArgs) cmdList.push(); // TODO:
    if (option.cpuLimit) cmdList.push(`--cpu-limit ${option.cpuLimit}`);
    if (option.realLimit) cmdList.push(`--real-limit ${option.realLimit}`);
    if (option.memLimit) cmdList.push(`--mem-limit ${option.memLimit}`);

    const cmd = cmdList.join(' ');

    const { stdout, stderr } = await util.promisify(child_process.exec)(cmd, {
      timeout: 0,
      encoding: 'utf-8',
    });

    // TODO:
    if (stderr.trim() === '') {
      throw new Error(stderr);
    }

    const judgeInfo = plainToInstance(JudgeInfo, stdout);

    return judgeInfo;
  }
}
